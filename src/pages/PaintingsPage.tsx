import request, { gql } from "graphql-request";
import { useEffect, useState } from "react";
import PaintingCard from "../components/PaintingCard/PaintingCard";
import SimpletLink from "../components/PaintingCard/SimpletLink";

const query = gql`
  {
    getPaintings {
      title
      author
      imageUrl
      description
      _id
    }
  }
`;

function PaintingsPage() {
  const [paintings, setPaintings] = useState([]);
  useEffect(() => {
    request("http://localhost:4000/graphql", query).then((data) => {
      setPaintings(data.getPaintings);
      console.log(data);
    });
  }, []);
  return (
    <div className="p-10">
      <div className="bg-gray-200 p-7">
        <h1 className="text-4xl my-9">Las pinturas</h1>
        <SimpletLink path="newPainting" text="Anadir pintura" />
      </div>
      <div className="w-screen flex flex-wrap">
        {paintings.map((painting) => (
          <PaintingCard painting={painting} key={painting._id} />
        ))}
      </div>
    </div>
  );
}

export default PaintingsPage;
