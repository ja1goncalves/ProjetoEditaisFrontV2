import React from "react";
import Image from "next/image";

interface CardsProps {
  title: string;
  description: string;
  image: string;
}

export const Cards: React.FC<CardsProps> = ({ title, description, image }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="h-64 w-full object-fill" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Preview
        </button>
      </div>
    </div>
  );
};
