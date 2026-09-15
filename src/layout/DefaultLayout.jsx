import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/default-layout.css";

const DefaultLayout = () => {
  return (
    <div className="default-layout">
      <Header />

      <main className="default-layout__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DefaultLayout;
