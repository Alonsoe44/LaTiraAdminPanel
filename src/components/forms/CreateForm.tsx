/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { Waveform } from "@uiball/loaders";
import { useAppDispatch, useAppSelector } from "../../reduxToolkit/hooks";
import PaintingsStateInterface from "../../interfaces/PaintingsStateInterface";
import { createPaintingThunk } from "../../reduxToolkit/paintings/paintingsThunks";

function CreateForm() {
  const { register, handleSubmit } = useForm();
  const paintingsState = useAppSelector(
    (state) => state.paintings
  ) as PaintingsStateInterface;
  const dispatch = useAppDispatch();

  const onSubmit = async (data) => {
    const submitData = { ...data, imageFile: data.imageFile[0] };
    dispatch(createPaintingThunk(submitData));
  };

  return (
    <div className="flex items-center justify-center w-screen">
      {paintingsState.isLoading ? (
        <Waveform />
      ) : (
        <form
          className="flex-row w-1/3 bg-white shadow-md p-10  rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="title" className="block my-5">
            Titulo
            <input
              id="title"
              type="text"
              className="bg-black-100 border-2 block"
              {...register("title")}
            />
          </label>

          <label htmlFor="description" className="block my-5">
            Descripcion
            <input
              id="description"
              className="bg-black-100 border-2 block"
              {...register("description")}
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

          <label htmlFor="imageFile" className="block my-5">
            Imagen
            <input
              id="imageFile"
              className="block mt-4"
              type="file"
              {...register("imageFile")}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-300 rounded-md m-3 p-1 w-40 block"
          >
            Subir
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateForm;
