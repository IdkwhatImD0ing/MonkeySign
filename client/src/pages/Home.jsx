import LandingPicture from "../assets/landing-page-picture.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-lexend-deca h-[calc(100vh-80px)]">
      <div className="h-[calc(100vh-80px)]">
        <div className="flex text-center sm:text-left items-center mx-[5%] sm:mx-[10%] justify-between cursor-default">
          <div className="flex flex-col justify-center">
            <div className="text-[12px] xs:text-[16px] sm:mb-[-20px] text-[#cd75cf] mt-[150px]">
              powered by machine learning
            </div>
            <div className="text-[32px] sm:text-[72px]">monkeysign</div>
            <div className="text-[#9e9e9e] font-light">
              the ultimate platform for learning and practicing American Sign
              Language (ASL)
            </div>
            <Link
              to="/play"
              className="self-center sm:self-start bg-[#fcd9fc] hover:bg-[#db8fdd] border border-black rounded-lg px-8 py-4 mt-8"
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
      <div className="h-[500px]">
        <div className="flex text-center gap-[64px] lg:text-right items-center mx-[5%] sm:mx-[10%] justify-between cursor-default pb-[100px]">
          <div className="lg:block hidden">
            <img
              src="./learn-asl.png"
              alt="learn-asl"
              className="w-[1900px] mt-[100px]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-[12px] xs:text-[16px] text-[#cd75cf] mt-[100px]">
              learning asl!
            </div>
            <div className="text-[32px] sm:text-[36px]">what are we about?</div>
            <div className="text-[#9e9e9e] font-light">
              are you interested in learning ASL? or do you already know it and
              want to improve your skills? monkeysign is the perfect place for
              you. <br />
              <br />
              our website allows you to measure how fast you can use ASL at the
              comfort of your computer! you can test your speed, accuracy, and
              comprehension of ASL signs and phrases in a fun and engaging way.
              <br />
              <br />
              so, whether you are a student, teacher, or simply someone who
              wants to learn a new language, MonkeySign is the perfect platform
              to learn and improve your American Sign Language skills. join us
              now and start your journey towards becoming an expert in ASL!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
