import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PaintingInterface from "../../interfaces/PaintingInterface";

const validateImage = (paintings, newPainting) =>
  paintings.find((painting) => painting === newPainting)
    ? paintings.filter((painting) => painting !== newPainting)
    : [...paintings, newPainting];
interface ImageTargetProps {
  imageData: ImageData;
  pushImage: any;
  selectedImages: PaintingInterface[];
}
interface ImageData {
  title: string;
  imageUrl: string;
  author: string;
  imageId: string;
}

function ImageTarget({
  imageData,
  pushImage,
  selectedImages,
}: ImageTargetProps) {
  const [selected, toggleSelected] = useState(false);
  return (
    <div
      className={`h-[11.5rem] m-2 relative p-1  from-white ${
        selected && "bg-blue-400"
      } rounded-sm`}
    >
      <button
        className="h-44  bg-gradient-to-t to-transparent z-20 from-slate-800 w-[calc(100%-0.5rem)] absolute"
        type="button"
        onClick={() => {
          toggleSelected(!selected);
          pushImage(validateImage(selectedImages, imageData.imageId));
        }}
      >
        .
      </button>
      <img
        className="h-44 w-auto rounded-sm bg-gradient-to-b"
        src={imageData.imageUrl}
        alt={imageData.title}
      />
      <h4 className="absolute text-white left-4 bottom-5 break-words text-sm z-30">
        {imageData.title}
      </h4>
      <h3 className="absolute text-white left-4 bottom-2 break-words text-[0.5rem] z-30">
        {imageData.author}
      </h3>
      {selected && (
        <FaCheckCircle className="text-blue-400 absolute right-3 text-xl top-2 z-30 " />
      )}
    </div>
  );
}

export default ImageTarget;
