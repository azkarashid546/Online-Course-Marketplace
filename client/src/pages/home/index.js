import React from "react";
import Hero from "../../components/Home/Hero";
import Courses from "../../components/Home/Courses";
import Reviews from "../../components/Home/Reviews";
import FAQ from "../../components/Home/FAQ";
import Loader from "../../components/Loader/Loader";
import { useGetHeroDataQuery } from "../../redux/features/layout/layoutApi";
const Index = () => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <Hero />
          <Courses />
          <Reviews />
          <FAQ />
        </div>
      )}
    </>
  );
};

export default Index;
