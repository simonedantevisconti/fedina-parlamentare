import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";

import HomePage from "./pages/HomePage";
import CameraPage from "./pages/CameraPage";
import SenatoPage from "./pages/SenatoPage";
import PoliticianPage from "./pages/PoliticianPage";
import MethodologyPage from "./pages/MethodologyPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/camera" element={<CameraPage />} />

          <Route path="/senato" element={<SenatoPage />} />

          <Route path="/politico/:id" element={<PoliticianPage />} />

          <Route path="/metodologia" element={<MethodologyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
