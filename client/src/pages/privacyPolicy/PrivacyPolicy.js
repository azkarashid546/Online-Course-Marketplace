import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container">
        <section>
          <h1
            className="text-white text-center mt-5"
            style={{ fontSize: "40px" }}
          >
            Privacy Policy
          </h1>

          <p
            className="text-white text-justify mt-4"
            style={{ fontSize: "20px" }}
          >
            ELearning values your privacy, and protecting your information is
            important to us. Please read our privacy policy carefully to
            understand how we collect, use, protect or otherwise handle your
            Personally Identifiable Information in accordance with our website.
          </p>
          <h1 className="text-white mt-4" style={{ fontSize: "30px" }}>
            What personal information do we collect from you when visiting our
            website?
          </h1>

          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
            When ordering or registering on our site, you will ask to enter your
            name, email address, mailing address, or other details to help you
            with your experience.
          </p>
          <h1 className="text-white mt-4" style={{ fontSize: "30px" }}>
            When do we collect information?
          </h1>
          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
            We may use the information we collect from you in the following
            ways:
            <ul>
              <li style={{ listStyle: "disc" }}>
                {" "}
                To allow us to serve you in customer service responses better
                and improve our website.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                {" "}
                To administer a contest, promotion, survey, or other site
                feature.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                {" "}
                To quickly process your transactions.
              </li>
              <li style={{ listStyle: "disc" }}>
                {" "}
                To ask for reviews of services or products.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                {" "}
                To follow up with you after correspondence (email, forum, live
                chat, or phone).
              </li>
            </ul>
          </p>
          <h1 className="text-white mt-4" style={{ fontSize: "30px" }}>
            How do we protect your information?
          </h1>
          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
            Your personal information is behind secured networks. It is only
            accessible by a limited number of persons with special access rights
            to such systems, and they must keep the information confidential. In
            addition, all sensitive/credit information you supply is encrypted
            via Secure Socket Layer (SSL) technology.
          </p>

          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
            We implement a variety of security measures when a user places an
            order, and enters, submits, or accesses their information to
            maintain the safety of your personal information.
          </p>

          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
            All transactions are processed through a gateway provider and are
            not stored or processed on our servers.
          </p>
          <h1 className="text-white mt-4" style={{ fontSize: "30px" }}>
            PayPal
          </h1>
          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
            When you use PayPal to pay for your order, you will directly provide
            your personal information and credit card number to PayPal. PayPal’s
            privacy policy will protect the information you provide on the
            PayPal website.
          </p>
          <h1 className="text-white mt-4" style={{ fontSize: "30px" }}>
            2CheckOut
          </h1>
          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
            When you use 2CheckOut to pay for your order, you will directly
            provide your personal information and credit card number to
            2CheckOut. 2CheckOut’s privacy policy will protect the information
            you provide on the 2CheckOut website.
          </p>
          <h1 className="text-white mt-4" style={{ fontSize: "30px" }}>
            Do we use ‘cookies’?
          </h1>
          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
            Yes. Cookies are small files that a site or its service provider
            transfers to your computer’s hard drive through your Web browser (if
            you allow), enabling the site’s or service provider’s systems to
            recognize your browser and capture and remember certain information.
            For instance, cookies help us remember and process the items in our
            shopping cart. They are also used to help us understand your
            preferences based on previous or current site activity, which
            enables us to provide you with improved services. We also use
            cookies to help us compile aggregate data about site traffic and
            interaction to offer better site experiences and tools in the
            future.
          </p>
          <h1 className="text-white mt-4" style={{ fontSize: "30px" }}>
            We use cookies to:
          </h1>
          <p
            className="text-white text-justify mt-3"
            style={{ fontSize: "20px" }}
          >
          
          <ul>
            <li style={{ listStyle: "disc" }}>
              Help remember and process the items in the shopping cart.
            </li>
            <li style={{ listStyle: "disc" }}>
              Help remember a user’s login session.
            </li>
            <li style={{ listStyle: "disc" }}>
              Understand and save users’ preferences for future visits.
            </li>
            <li style={{ listStyle: "disc" }}>Keep track of advertisements.</li>
            <li style={{ listStyle: "disc" }}>
              Compile aggregate data about site traffic and site interactions to
              offer better site experiences and tools in the future. We may also
              use trusted third-party services that track this information on
              our behalf.
            </li>
          </ul>
        </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
