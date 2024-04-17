import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
