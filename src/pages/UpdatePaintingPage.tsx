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
      <h1>Actualiza la pintura </h1>
      <UpdateForm painting={editedPainting} />
    </>
  );
}

export default UpdatePaintingPage;
