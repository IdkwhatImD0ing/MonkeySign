import { WebcamComponent } from ".";
import { useState } from "react";

const PlayComponent = () => {
  // const [timer, setTimer] = useState("15");
  return (
    <div className="w-full flex flex-col items-center">
      {/* <div className="mt-[24px] w-[400px] h-[80px] bg-[#e7d6e6] rounded-xl flex flex-col items-center justify-around py-[8px] px-[16px] text-[#818181] text-[14px] font-normal">
        <div className="w-full flex gap-20 justify-center">
          <div className="hover:text-[#454545] cursor-pointer">learn</div>
          <div className="hover:text-[#454545] cursor-pointer">test</div>
        </div>
        <div className="flex justify-around w-full">
          <div
            className="hover:text-[#454545] cursor-pointer"
            onClick={() => setTimer("15")}
          >
            15
          </div>
          <div
            className="hover:text-[#454545] cursor-pointer"
            onClick={() => setTimer("30")}
          >
            30
          </div>
          <div
            className="hover:text-[#454545] cursor-pointer"
            onClick={() => setTimer("60")}
          >
            60
          </div>
          <div
            className="hover:text-[#454545] cursor-pointer"
            onClick={() => setTimer("120")}
          >
            120
          </div>
        </div>
      </div> */}
      <div className="rounded-lg overflow-hidden mx-[10%] mt-[24px] mb-[24px]">
        <WebcamComponent />
      </div>
    </div>
  );
};

export default PlayComponent;
