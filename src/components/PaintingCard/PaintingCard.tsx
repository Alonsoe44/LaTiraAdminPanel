import request, { gql } from "graphql-request";
import PaintingInterface from "../../interfaces/PaintingInterface";
import SimpleButton from "./SimpleButton";
import SimpletLink from "./SimpletLink";

const apiUrl = import.meta.env.VITE_API_URL;

const deletePaintingMutation = gql`
  mutation deletePainting($input: NewPaintingInput) {
    deletePainting(input: $input) {
      message
    }
  }
`;

interface PaintingCardProps {
  painting: PaintingInterface;
}

function PaintingCard({ painting }: PaintingCardProps) {
  return (
    <div className="flex flex-col  max-w-sm rounded-lg shadow m-7 ">
      <img
        alt={painting.title}
        className="w-max h-[20rem] self-center"
        src={painting.imageUrl}
      />
      <div className="p-5 bg-slate-200">
        <h3 className="text-lg">{painting.title}</h3>
        <p className="my-4 text-sm text-gray-500">{painting.description}</p>
        <SimpletLink
          path={`updatePainting/${painting._id}`}
          text="Actualizar"
        />
        <SimpleButton
          color="bg-orange-400 text-white"
          text="Borrar"
          buttonAction={() => {
            console.log("delete working");
            request(apiUrl, deletePaintingMutation, {
              input: { imageUrl: painting.imageUrl, _id: painting._id },
            });
          }}
        />
      </div>
    </div>
  );
}

export default PaintingCard;
