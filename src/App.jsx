import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import DefaultLayout from "./layout/DefaultLayout";

import HomePage from "./pages/HomePage";
import CameraPage from "./pages/CameraPage";
import SenatoPage from "./pages/SenatoPage";
import MethodologyPage from "./pages/MethodologyPage";
import NotFoundPage from "./pages/NotFoundPage";

const PoliticianPage = lazy(() => import("./pages/PoliticianPage"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/camera" element={<CameraPage />} />

          <Route path="/senato" element={<SenatoPage />} />

          <Route path="/politico/:id" element={
            <Suspense fallback={<p className="container" role="status">Caricamento della scheda…</p>}>
              <PoliticianPage />
            </Suspense>
          } />

          <Route path="/metodologia" element={<MethodologyPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
