/* eslint-disable react/jsx-props-no-spreading */
import { Waveform } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ArtCollectionStateInterface from "../../interfaces/ArtCollectionStateInterface";
import PaintingsStateInterface from "../../interfaces/PaintingsStateInterface";
import { createArtCollectionThunk } from "../../reduxToolkit/artCollections/artCollecionThunks";
import { useAppDispatch, useAppSelector } from "../../reduxToolkit/hooks";
import { getPaintingsThunk } from "../../reduxToolkit/paintings/paintingsThunks";
import ImageTarget from "./ImageTarget";

function CreateArtCollectionForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [paintingsCollection, pushPaintingCollection] = useState([]);
  const [formStep, setFormStep] = useState("partOne");
  const [bannerImage, setBannerImage] = useState("");
  const paintingsState = useAppSelector(
    (state) => state.paintings
  ) as PaintingsStateInterface;
  const artCollectionState = useAppSelector(
    (state) => state.artCollections
  ) as ArtCollectionStateInterface;

  const onSubmit = (data) => {
    const bannerUrl = paintingsState.paintings.find(
      (painting) => painting._id === bannerImage[0]
    ).imageUrl;
    const submitObject = {
      ...data,
      paintings: paintingsCollection,
      bannerImage: bannerUrl,
    };
    console.log(submitObject);
    dispatch(createArtCollectionThunk(submitObject));
  };

  const formParts = {
    partOne: (
      <div className="flex flex-col justify-center">
        <h1 className="text-slate-400 text-xl">Paso 1</h1>
        <h1 className="text-3xl">Informacion</h1>
        <label htmlFor="title" className="block my-5">
          Titulo
          <input
            id="title"
            type="text"
            className="bg-black-100 border-2 block"
            {...register("title")}
          />
        </label>

        <label htmlFor="author" className="block my-5">
          Autor
          <input
            id="author"
            className="bg-black-100 border-2 block"
            {...register("author")}
          />
        </label>

        <label htmlFor="smallDescription" className="block my-5">
          Descripcion corta
          <input
            id="smallDescription"
            className="border-2 block"
            {...register("smallDescription")}
          />
        </label>

        <label htmlFor="description" className="block my-5 sm:w-[20rem]">
          Descripcion
          <textarea
            cols={10}
            id="description"
            className="bg-black-100 border-2 block w-full"
            {...register("description")}
          />
        </label>

        <button
          type="button"
          onClick={() => setFormStep("partTwo")}
          className="bg-blue-300 rounded m-3 p-1 w-20-md w-40 block"
        >
          Siguiente
        </button>
      </div>
    ),
    partTwo: (
      <div>
        <h1 className="text-slate-400 text-xl">Paso 2</h1>
        <h1 className="text-3xl">Pinturas</h1>
        <h3 className="text-lg block">
          Selecciona las pinturas de la coleccion
        </h3>
        <div className="flex flex-wrap">
          {paintingsState.isLoading ? (
            <Waveform />
          ) : (
            paintingsState.paintings.map((painting) => (
              <ImageTarget
                key={painting._id}
                imageData={{
                  title: painting.title,
                  author: painting.author,
                  imageId: painting._id,
                  imageUrl: painting.imageUrl,
                }}
                selectedImages={paintingsCollection}
                pushImage={pushPaintingCollection}
              />
            ))
          )}
        </div>{" "}
        <button
          type="button"
          onClick={() => setFormStep("partThree")}
          className="bg-blue-300 rounded-md m-3 p-1 w-40 block"
        >
          Siguiente
        </button>
      </div>
    ),
    partThree: (
      <div>
        {bannerImage ? (
          <>
            <h1 className="text-3xl">Terminamos</h1>
            <h1>Haz click en crear coleccion</h1>
            <button className="bg-blue-300 rounded m-3 p-1 w-60" type="submit">
              Crear coleccion
            </button>
          </>
        ) : (
          <>
            <h1 className="text-slate-400 text-xl">Paso 3</h1>
            <h1 className="text-3xl">Portada</h1>
            <h2>Seleccione la portada de la coleccion</h2>
            <div className="flex flex-wrap">
              {paintingsState.paintings
                .filter((painting) =>
                  paintingsCollection.find(
                    (selected) => selected === painting._id
                  )
                )
                .map((painting) => (
                  <ImageTarget
                    imageData={{
                      author: painting.author,
                      imageId: painting._id,
                      imageUrl: painting.imageUrl,
                      title: painting.title,
                    }}
                    selectedImages={[]}
                    key={painting._id}
                    pushImage={setBannerImage}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    ),
  };
  useEffect(() => {
    dispatch(getPaintingsThunk());
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-screen ">
      <form
        className="flex-row  bg-slate-50 shadow-md p-10  rounded-md justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {artCollectionState.isLoading ? <Waveform /> : formParts[formStep]}
      </form>
    </div>
  );
}

export default CreateArtCollectionForm;
