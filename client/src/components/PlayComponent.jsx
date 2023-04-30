import { WebcamComponent } from ".";
import { useState } from "react";

const PlayComponent = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="rounded-lg overflow-hidden mx-[10%] mt-[24px] mb-[24px]">
        <WebcamComponent />
      </div>
    </div>
  );
};

export default PlayComponent;
