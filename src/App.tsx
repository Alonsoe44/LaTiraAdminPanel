import { Route, Routes } from "react-router-dom";
import CreatePaintingPage from "./pages/CreatePaintingPage";
import PaintingsPage from "./pages/PaintingsPage";
import UpdatePaintingPage from "./pages/UpdatePaintingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaintingsPage />} />
      <Route path="paintings" element={<PaintingsPage />} />
      <Route path="newPainting" element={<CreatePaintingPage />} />
      <Route path="updatePainting/:id" element={<UpdatePaintingPage />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}

export default App;
