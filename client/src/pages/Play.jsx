import { useState } from "react";
import { Link } from "react-router-dom";
import { PlayComponent } from "../components";

const Play = () => {
  const [showModal, setShowModal] = useState(true);
  const [webcam, setWebcam] = useState(false);
  return (
    <div className="min-h-[calc(100vh-80px-60px)]">
      <div className="">{webcam ? <PlayComponent /> : <></>}</div>

      <div className={`relative z-10 ${showModal ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#efcdef] sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-[#cd75cf]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="font-lexend-deca text-base font-semibold leading-6 text-gray-900">
                      Webcam usage
                    </h3>
                    <div className="mt-2">
                      <p className="font-lexend-deca text-sm text-gray-500">
                        At MonkeySign, we take the privacy of our users
                        seriously. Please note that to use our platform, we
                        require access to your webcam. This allows us to
                        accurately measure your speed and accuracy in using
                        American Sign Language (ASL).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="font-lexend-deca inline-flex w-full justify-center rounded-md bg-[#cd75cf] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#feb1ff] sm:ml-3 sm:w-auto"
                  onClick={() => {
                    setShowModal(!showModal);
                    setWebcam(!webcam);
                  }}
                >
                  Allow
                </button>
                <Link
                  to="/"
                  className="font-lexend-deca mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
