import React from "react";
import ArtCollectionInterface from "../../interfaces/ArtCollectionInterface";
import SimpletLink from "../SimpletLink";

interface ArtCollectionProp {
  artCollection: ArtCollectionInterface;
}
function ArtCollectionCard({ artCollection }: ArtCollectionProp) {
  return (
    <div className="h-[22rem] p-10 border-black  bg-slate-50 flex shadow-md rounded-md justify-around lg:w-1/2">
      <div className="w-[70%] flex flex-col justify-around">
        <h4 className="text-slate-500 text-sm">{artCollection.author}</h4>
        <h2 className="text-xl">{artCollection.title}</h2>
        <p className="my-5 break-words line-clamp-6">
          {artCollection.description}
        </p>
        <SimpletLink
          path={`/updateArtCollection/${artCollection._id}`}
          text="Editar"
        />
      </div>
      <div className="ml-10">
        <img
          className="max-h-full"
          src={artCollection.bannerImage}
          alt={artCollection.title}
        />
      </div>
    </div>
  );
}

export default ArtCollectionCard;
