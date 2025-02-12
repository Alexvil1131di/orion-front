import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useCheckAuth from "./hooks/useAuth";

import NavBar from "./components/common/navBar";

import MainPage from "./pages";
import Login from "./pages/Auth/Login";
import UrlRedirect from "./pages/url/urlRedirect";

import "react-toastify/dist/ReactToastify.css";
import useRefreshToken from "./hooks/useRefreshToken";
import Register from "./pages/Auth/Register";

export default function App() {
  const pathName = window.location.pathname;
  const { isAuth } = useCheckAuth(pathName);
  useRefreshToken(pathName);

  console.log("isAuth", isAuth);


  return (
    <>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover={true}
          theme="light"
        />

        <div className="pt-14 h-full w-full text-[#444]">
          <NavBar isAuth={isAuth}></NavBar>

          <Routes>
            <Route path="/" element={<MainPage isAuth={isAuth}></MainPage>} />
            <Route path="/Auth/Login" element={<Login></Login>} />
            <Route path="/LX/:token" element={<UrlRedirect></UrlRedirect>} />

            <Route path="/Auth/Register" element={<Register></Register>} />
            <Route path="/Partners" element={<></>} />
            <Route path="/Reports" element={<></>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
