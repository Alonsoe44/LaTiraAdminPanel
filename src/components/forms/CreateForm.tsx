/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { gql, request } from "graphql-request";

const createPaintingMutation = gql`
  mutation NewPainting($input: NewPaintingInput) {
    newPainting(input: $input) {
      message
    }
  }
`;

function CreateForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const submitData = { ...data, imageFile: data.imageFile[0] };
    request("http://localhost:4000/graphql", createPaintingMutation, {
      input: submitData,
    }).then((apiResponse) => {
      console.log(apiResponse);
    });
  };

  return (
    <div className="flex items-center justify-center w-screen">
      <form
        className="flex-row w-1/3 bg-white shadow-md p-10  rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="description" className="block">
          Description
          <input
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
          />
        </label>

        <label htmlFor="author">
          Author
          <input
            id="author"
            className="bg-black-100 border-2 block"
            {...register("author")}
          />
        </label>

        <label htmlFor="imageFile" className="block">
          File
          <input id="imageFile" type="file" {...register("imageFile")} />
        </label>
        <button type="submit" className="bg-red-200 rounded-md m-3 p-1 w-40">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
