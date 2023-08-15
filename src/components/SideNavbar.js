import Image from "next/image";
import React, { useState } from "react";
import menu from "../../data/menu";
import CreateFolderModal from "./folder/CreateFolderModal";
import Link from "next/link";
import UploadFileModal from "@/components/file/UploadFileModal";

const SideNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMenuClick = (item, index) => {
    console.log(index);
    setActiveIndex(index);
  };

  return (
    <div className="w-[200px] bg-white h-screen sticky top-0 z-10 shadow-blue-300 shadow-md px-5">
      <div className="flex justify-center">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={150} height={60} />
        </Link>
      </div>

      <button
        className="flex gap-2 items-center text-[13px]
        bg-sky-400 w-full p-2 justify-center text-white rounded-md px-3
        hover:scale-105 transition-all mt-1"
        onClick={() => window.my_modal_3.showModal()}
      >
        Create Folder
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        onClick={() => window.upload_file.showModal()}
        className="flex gap-2 items-center text-[13px]
        bg-blue-500 p-2 text-white rounded-md px-3
        hover:scale-105 transition-all mt-5 w-full justify-center"
      >
        Add New File
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* menu list */}
      <div className="mt-7">
        {menu.list.map((item, index) => (
          <h2
            key={index}
            onClick={() => onMenuClick(item, index)}
            className={`flex gap-2 items-center
            p-2 mt-3  rounded-md cursor-pointer
            hover:bg-blue-500 hover:text-white
            ${
              activeIndex == index ? "bg-blue-500 text-white" : "text-gray-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={item.logo}
              />
            </svg>
            {item.name}
          </h2>
        ))}
      </div>

      <dialog id="my_modal_3" className="modal">
        <CreateFolderModal />
      </dialog>
      <dialog id="upload_file" className="modal">
        <UploadFileModal closeModal={()=>window.upload_file.close()}/>
      </dialog>
    </div>
  );
};

export default SideNavbar;
