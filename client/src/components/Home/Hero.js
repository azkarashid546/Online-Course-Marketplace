import React, { useEffect, useState } from "react";
// import People1 from "../images/people1.jpg";
// import People2 from "../images/people2.jpg";
// import People3 from "../images/people3.jpg";
// import HeroImg from "../images/hero.jpg";
import { Link } from "react-router-dom";
import { useGetHeroDataQuery } from "../../redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  let navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    refetch();
    setBanner(data?.layout?.banner);
  }, [data]);

  const handleSearch = () => {
    if(search === ""){
      return
    }
    else{
      navigate(`/courses?title=${search}`)
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        
        <div className="row">
          {/* Left column */}
          <div className="col-md-6">
            <div className="hero-img-section">
              <div className="hero-img">
                <img src={banner?.image?.url} alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="hero-content =py-5 d-flex align-items-center">
              <div className="heading">
                <div className="hero-heading">
                  <h1 className="text-white" style={{ fontSize: "45px" }}>
                    {banner?.title}
                  </h1>
                </div>
                <div className="intro mt-4 mb-5">
                  <p className="text-white">{banner?.subTitle}</p>
                </div>
                <div className="searchbar">
                  <form>
                    <div className="d-flex border" style={{ alignItems: "center", backgroundColor: "" }}>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-100 text-white form-control bg-transparent"
                        placeholder="Search Courses..."
                      />
                      <div style={{ backgroundColor: "#0D6DDE", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleSearch}>
                        <i class="fa-solid fa-magnifying-glass fa-lg text-white " style={{ padding: "22px 10px" }}></i>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      
          {/* Right column */}
         
        </div>
    
      
      )}
    </>
  );
};

export default Hero;
