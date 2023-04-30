import LandingPicture from "../assets/landing-page-picture.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-lexend-deca h-[calc(100vh-80px)]">
      <div className="flex items-center mx-[5%] sm:mx-[10%] justify-between">
        <div className="flex flex-col justify-center ">
          <div className="mb-[-20px] text-[#cd75cf] mt-[150px]">
            powered by machine learning
          </div>
          <div className="text-[72px]">monkeysign</div>
          <div className="text-[#9e9e9e] font-light">
            the ultimate platform for learning and practicing American Sign
            Language (ASL)
          </div>
          <Link
            to="/play"
            className="self-start bg-[#fcd9fc] hover:bg-[#db8fdd] border border-black rounded-lg px-8 py-4 mt-8"
          >
            get started
          </Link>
        </div>
        <div className="lg:block hidden">
          <img
            src={LandingPicture}
            alt="landing-picture"
            className="mt-[150px] w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
