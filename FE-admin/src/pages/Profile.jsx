import React from "react";
import { AiOutlineCamera } from "react-icons/ai";
// import { Avatar } from "flowbite-react";

const Profile = () => {
  return (
    <>
      <section className="pt-20 pb-44 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/162f954665c90f6c0f9f1d53ab9aa93c-1669238247/headshot%20om/draw-anime-illustration-for-avatar-profile-picture-youtube-twich-etc.png"
                      className="shadow-xl rounded-full left-5 l-50 -mt-10 w-24 z-2 align-middle border-2 lg:-ml-16 max-w-150-px max-w-none absolute"
                    />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center z-10 pl-5 cursor-pointer hover:text-sky-700 text-center text-3xl">
                    <AiOutlineCamera />
                  </div>
                </div>
              </div>

              <div className="text-center mt-10">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  Nguyễn Văn Hội
                </h3>
                <p className="text-sm mb-2">nguyenvanhoi2k3@gmail.com</p>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  Hà Nội, Việt Nam
                </div>
                <div className="mb-2 text-blueGray-600">
                  Trường Cao Đẳng FPT Polytechnic
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <div className="text-center opacity-40 text-slate-700">
                      Copyright by JordanVTH
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
