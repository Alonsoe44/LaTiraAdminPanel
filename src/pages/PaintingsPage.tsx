import { useEffect } from "react";
import PaintingCard from "../components/PaintingCard/PaintingCard";
import SimpletLink from "../components/SimpletLink";
import PaintingsStateInterface from "../interfaces/PaintingsStateInterface";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import { getPaintingsThunk } from "../reduxToolkit/paintings/paintingsThunks";

function PaintingsPage() {
  const paintingsredux = useAppSelector(
    (state) => state.paintings
  ) as PaintingsStateInterface;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPaintingsThunk());
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="sm:text-5xl text-3xl text-center font-medium my-10">
          Todas las pinturas de la galeria
        </h1>
        <SimpletLink path="/newPainting" text="Anadir pintura" />
      </div>
      <div className="sm:p-10">
        <div className="flex flex-wrap justify-around">
          {paintingsredux.paintings.map((painting) => (
            <PaintingCard painting={painting} key={painting._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PaintingsPage;
