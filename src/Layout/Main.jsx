import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

export default function Main() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-550px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
