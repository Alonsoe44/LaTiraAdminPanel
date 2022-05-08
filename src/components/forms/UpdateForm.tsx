/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { gql, request } from "graphql-request";
import { useEffect } from "react";
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

function UpdateForm({ painting }: UpdateFormProps) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const submitData = {
      ...data,
      imageUrl: painting.imageUrl,
      _id: painting._id,
    };
    console.log("This is the submit data");
    console.log(submitData);
    request("http://localhost:4000/graphql", updatePaintingMutation, {
      input: submitData,
    }).then((apiResponse) => {
      console.log(apiResponse);
    });
  };
  useEffect(() => {
    reset();
  }, []);
  return (
    <div className="flex items-center justify-center w-screen">
      <form
        className="flex-row w-1/3 bg-white shadow-md p-10  rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="description" className="block">
          Description
          <input
            defaultValue={painting.description}
            id="description"
            className="bg-black-100 border-2 block"
            {...register("description")}
          />
        </label>

        <label htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            className="bg-black-100 border-2 block"
            {...register("title")}
            defaultValue={painting.title}
          />
        </label>

        <label htmlFor="author">
          Author
          <input
            defaultValue={painting.author}
            id="author"
            className="bg-black-100 border-2 block"
            {...register("author")}
          />
        </label>
        <button type="submit" className="bg-red-200 rounded-md m-3 p-1 w-40">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
