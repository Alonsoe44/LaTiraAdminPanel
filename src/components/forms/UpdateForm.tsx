/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { gql, request } from "graphql-request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaintingInterface from "../../interfaces/PaintingInterface";

const updatePaintingMutation = gql`
  mutation updatePainting($input: NewPaintingInput) {
    updatePainting(input: $input) {
      message
    }
  }
`;

interface UpdateFormProps {
  painting: PaintingInterface;
}

const apiUrl = import.meta.env.VITE_API_URL;
function UpdateForm({ painting }: UpdateFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const submitData = {
      ...data,
      imageUrl: painting.imageUrl,
      _id: painting._id,
    };

    request(apiUrl, updatePaintingMutation, {
      input: submitData,
    }).then(() => {
      navigate("/paintings");
    });
  };

  useEffect(() => {
    reset();
  }, []);
  return (
    <div className="flex items-center justify-center w-screen">
      <form
        className="flex  bg-white shadow-md p-10  rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img
          src={painting.imageUrl}
          alt={painting.title}
          className="max-h-[30rem] mr-10"
        />
        <div className="flex flex-col ">
          <label htmlFor="title" className="block my-5">
            Titulo
            <input
              id="title"
              type="text"
              className="bg-black-100 border-2 block"
              {...register("title")}
              defaultValue={painting.title}
            />
          </label>

          <label htmlFor="description" className="block my-5">
            Descripcion
            <input
              id="description"
              className="bg-black-100 border-2 block"
              {...register("description")}
              defaultValue={painting.description}
            />
          </label>

          <label htmlFor="author" className="block my-5">
            Autor
            <input
              id="author"
              className="bg-black-100 border-2 block"
              {...register("author")}
              defaultValue={painting.author}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-300 rounded-md m-3 p-1 w-40 block"
          >
            Subir
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
