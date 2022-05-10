import request, { gql } from "graphql-request";
import PaintingInterface from "../../interfaces/PaintingInterface";
import { useAppDispatch } from "../../reduxToolkit/hooks";
import { getPaintingsThunk } from "../../reduxToolkit/paintings/paintingsThunks";
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
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col bg-slate-50 max-w-sm rounded-lg shadow m-7 ">
      <div className="h-[20rem] overflow-x-hidden max-h-full self-center flex">
        <img
          alt={painting.title}
          className=" overflow-hidden self-center max-h-full w-auto justify-self-center"
          src={painting.imageUrl}
        />
      </div>
      <div className="p-5 bg-slate-200">
        <h3 className="text-lg">{painting.title}</h3>
        <p className="my-4 text-sm text-gray-500">{painting.description}</p>
        <SimpletLink
          path={`/updatePainting/${painting._id}`}
          text="Actualizar"
        />
        <SimpleButton
          color="bg-orange-400 text-white"
          text="Borrar"
          buttonAction={async () => {
            await request(apiUrl, deletePaintingMutation, {
              input: { imageUrl: painting.imageUrl, _id: painting._id },
            });
            dispatch(getPaintingsThunk());
          }}
        />
      </div>
    </div>
  );
}

export default PaintingCard;
