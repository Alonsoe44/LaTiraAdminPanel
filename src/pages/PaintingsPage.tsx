import { useEffect } from "react";
import PaintingCard from "../components/PaintingCard/PaintingCard";
import SimpletLink from "../components/PaintingCard/SimpletLink";
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
    <div className="p-10">
      <div className="bg-gray-200 p-7">
        <h1 className="text-4xl my-9">Las pinturas</h1>
        <SimpletLink path="/newPainting" text="Anadir pintura" />
      </div>
      <div className="w-screen flex flex-wrap">
        {paintingsredux.paintings.map((painting) => (
          <PaintingCard painting={painting} key={painting._id} />
        ))}
      </div>
    </div>
  );
}

export default PaintingsPage;
