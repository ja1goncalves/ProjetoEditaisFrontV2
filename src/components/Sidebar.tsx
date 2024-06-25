import React from "react";

interface SidebarProps {
  userProfilePic: string;
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userProfilePic, username }) => {
  return (
    <div className=" h-screen bg-red-900 p-4">
      <div className="flex flex-col items-center mb-6">
        <img
          src={userProfilePic}
          alt="User Profile"
          className="h-40 w-40 rounded-full object-cover my-4"
        />
        <span className="text-white font-semibold text-xl mb-4">
          {username}
        </span>
      </div>
      <form className="mb-6 w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-700"
        />
      </form>
    </div>
  );
};

export default Sidebar;
