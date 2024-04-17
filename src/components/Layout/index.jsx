import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
