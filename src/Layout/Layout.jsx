import Navbar from "../Components/Navbar";
import ConicornFooter from "../Components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="flex-1  overflow-y-auto">
        <Outlet />
      </main>

      <ConicornFooter />
    </div>
  );
};

export default Layout;