import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";

import HomePage from "./pages/HomePage";
import CameraPage from "./pages/CameraPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/camera" element={<CameraPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
