const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  getAllCoursesService,
  getAllInstructorCoursesService,
} = require("../services/course");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");
const Course = require("../models/course");
const redis = require("../utils/redis");
const { default: mongoose } = require("mongoose");
const path = require("path");
const Notification = require("../models/notification");
const axios = require("axios");
const User = require("../models/user");

// upload course

const uploadCourse = catchAsyncErrors(async (req, res, next) => {
  try {
    const data = req.body;

    const instructor = await User.findOne({ role: "instructor" });

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "No instructor found",
      });
    }

    const instructorId = instructor._id;
    data.instructor = instructorId;

    if (data.thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const course = await Course.create(data);

    res.status(201).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Failed to upload course", 400));
  }
});

// edit course
const editCourse = catchAsyncErrors(async (req, res, next) => {
  try {
    const data = req.body;
    const thumbnail = data.thumbnail;
    const courseId = req.params.id;
    const courseData = await Course.findById(courseId);

    if (thumbnail && !thumbnail.startsWith("https")) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    if (thumbnail.startsWith("https")) {
      data.thumbnail = {
        public_id: courseData?.thumbnail.public_id,
        url: courseData?.thumbnail.url,
      };
    }
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: data,
      },
      { $new: true }
    );
    res.status(201).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get single course --- without purchasing
const getSingleCourse = catchAsyncErrors(async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const isCacheExist = await redis.get(courseId);
    if (isCacheExist) {
      console.log("hitting redis");
      const course = JSON.parse(isCacheExist);
      res.status(200).json({
        success: true,
        course,
      });
    } else {
      const course = await Course.findById(req.params.id).select(
        "-courseData.vedioUrl -courseData.suggestion -courseData.questions -courseData.links"
      );
      console.log("hitting mongodb");
      await redis.set(courseId, JSON.stringify(course), "EX", 604800);

      res.status(200).json({
        success: true,
        course,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get all courses --- without purchasing
const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  try {
    const courses = await Course.find().select(
      "-courseData.vedioUrl -courseData.suggestion -courseData.questions -courseData.links"
    );
    console.log("hitting mongodb");

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get course content --- only for valid user
const getCourseByUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return next(new ErrorHandler("Unauthorized", 401));
    }
    const courseId = req.params.id;
    if (user.role === "user") {
      const hasCourse = user.courses.some(
        (course) => course._id.toString() === courseId
      );
      if (!hasCourse) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 403)
        );
      }
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    const content = course.courseData;
    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllCoursesByUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    const userCourseList = user.courses;

    if (!userCourseList || userCourseList.length === 0) {
      return res.status(200).json({ success: true, courses: [] });
    }

    const courseIds = userCourseList.map((course) => course._id);

    const courses = await Course.find({ _id: { $in: courseIds } });

    res.status(200).json({
      success: true,
      courses: courses,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const addQuestion = catchAsyncErrors(async (req, res, next) => {
  try {
    const { question, courseId, contentId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid Content Id", 400));
    }

    const courseContent = course.courseData.find((item) =>
      item._id.equals(contentId)
    );
    if (!courseContent) {
      return next(new ErrorHandler("Invalid Content Id", 400));
    }

    const newQuestion = {
      user: req.user,
      question,
      avatar: req.user.avatar,
      questionReplies: [],
    };

    courseContent.questions.push(newQuestion);

    const instructor = await User.findById(course.instructor);
    if (!instructor || instructor.role !== "instructor") {
      return next(
        new ErrorHandler("Instructor not found or invalid role", 404)
      );
    }

    await Notification.create({
      course: course._id,
      instructor: course.instructor,
      user: req.user._id,
      message: `New Question Received for ${instructor.email} in ${courseContent.title}`,
      title: "New Question Received",
    });

    await redis.del(courseId);

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const addAnswer = catchAsyncErrors(async (req, res, next) => {
  try {
    const { answer, courseId, contentId, questionId } = req.body;

    const course = await Course.findById(courseId);
    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid Content Id", 400));
    }

    const courseContent = course?.courseData?.find((item) =>
      item._id.equals(contentId)
    );
    if (!courseContent) {
      return next(new ErrorHandler("Invalid Content Id", 400));
    }

    const question = courseContent?.questions?.find((item) =>
      item._id.equals(questionId)
    );

    if (!question) {
      return next(new ErrorHandler("Invalid Question Id", 400));
    }

    const newAnswer = {
      user: req.user,
      answer,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    question.questionReplies.push(newAnswer);

    await course?.save();
    await redis.set(courseId, JSON.stringify(course), "EX", 604800);

    const instructor = await User.findById(course.instructor);
    if (!instructor || instructor.role !== "instructor") {
      return next(
        new ErrorHandler("Instructor not found or invalid role", 404)
      );
    }

    await Notification.create({
      course: course._id,
      instructor: course.instructor,
      user: req.user._id,
      title: "New Reply to Student Question",
      message: `A new reply has been added to a student question in ${courseContent.title}`,
    });

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const addReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("courses");
    const courseId = req.params.id;

    const courseExists = user.courses.some(
      (course) => course._id.toString() === courseId.toString()
    );
    if (!courseExists) {
      return next(
        new ErrorHandler("You are not eligible to access this course", 404)
      );
    }

    const course = await Course.findById(courseId);
    const { review, rating, hasQuestion, question } = req.body;

    if (hasQuestion) {
      await addQuestionToCourse(course._id, question);
    }

    const reviewData = {
      user: req.user,
      comment: review,
      rating,
    };
    course?.review.push(reviewData);

    let avg = 0;

    course?.review.forEach((rev) => {
      avg += rev.rating;
    });
    if (course) {
      course.ratings = avg / course.review.length;
    }

    await course?.save();
    await redis.set(courseId, JSON.stringify(course), "Ex", 604800);
    const instructor = await User.findById(course.instructor);
    if (!instructor || instructor.role !== "instructor") {
      return next(
        new ErrorHandler("Instructor not found or invalid role", 404)
      );
    }

    await Notification.create({
      course: course._id,
      instructor: course.instructor,
      user: req.user._id,
      title: "New Review Received",
      message: `${req.user.name} has given a review in ${course.name}`,
    });

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const addReplyReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { comment, reviewId, courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    const review = course?.review?.find(
      (rev) => rev._id.toString() === reviewId.toString()
    );

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }
    const replyData = {
      user: req.user,
      comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (!review.commentReplies) {
      review.commentReplies = [];
    }
    review?.commentReplies.push(replyData);

    await course.save();
    await redis.set(courseId, JSON.stringify(course), "Ex", 604800);
    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllCoursesAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    getAllCoursesService(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const getAllCoursesInstructor = catchAsyncErrors(async (req, res, next) => {
  try {
    getAllInstructorCoursesService(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
// Delete Course --- only for Admin
const deleteCourse = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    console.log(id);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    await course.deleteOne();

    await redis.del(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const generateVideoUrl = catchAsyncErrors(async (req, res, next) => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      return next(new ErrorHandler("videoId is required", 400));
    }

    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl: 300 },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
        },
      }
    );

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error generating video URL:", error);
    return next(new ErrorHandler(error.message, error.response?.status || 500));
  }
});

module.exports = {
  uploadCourse,
  editCourse,
  getSingleCourse,
  getAllCourses,
  getCourseByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyReview,
  getAllCoursesAdmin,
  deleteCourse,
  generateVideoUrl,
  getAllCoursesByUser,
  getAllCoursesInstructor,
};
