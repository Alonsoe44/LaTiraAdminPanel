import React, { useEffect } from "react";
import { Waveform } from "@uiball/loaders";
import ArtCollectionStateInterface from "../interfaces/ArtCollectionStateInterface";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import ArtCollectionCard from "../components/ArtCollectionCard/ArtCollectionCard";
import { getArtCollectionsThunk } from "../reduxToolkit/artCollections/artCollecionThunks";
import SimpletLink from "../components/SimpletLink";

function ArtCollectionsPage() {
  const stateArtCollections = useAppSelector(
    (state) => state.artCollections
  ) as ArtCollectionStateInterface;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArtCollectionsThunk());
  }, []);

  return (
    <>
      <div className="text-3xl font-medium">Colecciones de arte</div>
      <SimpletLink
        path="/createArtCollection"
        text="Anadir coleccion de arte"
      />
      <div className="sm:p-10">
        {stateArtCollections.isLoading ? (
          <Waveform />
        ) : (
          stateArtCollections.artCollections.map((artCollection) => (
            <ArtCollectionCard
              artCollection={artCollection}
              key={artCollection._id}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ArtCollectionsPage;
