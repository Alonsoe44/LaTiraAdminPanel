import request, { gql } from "graphql-request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateForm from "../components/forms/UpdateForm";
import PaintingInterface from "../interfaces/PaintingInterface";

const queryGetPainting = gql`
  query getPainting($input: PaintingInput) {
    getPainting(input: $input) {
      author
      title
      description
      _id
      imageUrl
    }
  }
`;

const sillyPainting: PaintingInterface = {
  author: "Normal person",
  description: "Normal description",
  title: "Normal title",
  imageUrl: "None",
  _id: "1",
};

function UpdatePaintingPage() {
  const params = useParams();
  const [editedPainting, setEditedPainting] = useState(sillyPainting);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    request(apiUrl, queryGetPainting, { input: { _id: params.id } }).then(
      (data) => setEditedPainting(data.getPainting)
    );
  }, []);
  return (
    <>
      <div className="h-10 block" />
      <div className="flex flex-col w-screen items-center">
        <h1 className="text-3xl">Actualizar la informacion de la pintura</h1>
        <UpdateForm painting={editedPainting} />
      </div>
    </>
  );
}

export default UpdatePaintingPage;
