import React from "react";
import CreateArtCollectionForm from "../components/forms/CreateArtCollectionForm";

function CreateArtCollectionPage() {
  return (
    <>
      <div className="flex justify-center my-10">
        <h3 className="text-3xl text-center">
          Crea una nueva coleccion de arte
        </h3>
      </div>
      <CreateArtCollectionForm />
    </>
  );
}

export default CreateArtCollectionPage;
