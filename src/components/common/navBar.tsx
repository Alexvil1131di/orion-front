import { LoginServices } from "../../services/Auth/LoginServices";
import { useEffect, useState } from "react";

interface NavBarProps {
  isAuth: boolean;
}

const NavBar = ({ isAuth }: NavBarProps) => {
  const router = (route: string) => { window.location.href = route };
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [actualRoute, setActualRoute] = useState("");

  function handleLogout() {
    const loginServices = new LoginServices("", "");
    loginServices.logout();
  }

  function isActiveRoute(route: string) {
    return route == actualRoute ? "underline font-semibold" : "";
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentPath = window.location.pathname;
      if (currentPath !== actualRoute) {
        setActualRoute(currentPath);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [actualRoute]);

  console.log("actualRoute", actualRoute);



  return (
    <nav className="flex justify-between h-14 px-4 items-center text-md  shadow-lg bg-white shadow-[#00000010] fixed inset-0 z-[99]">
      <div className="flex items-center gap-2 ">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E0BAQFqyf2mpBoA-g/company-logo_200_200/company-logo_200_200/0/1630594711947/oriontek_logo?e=2147483647&v=beta&t=CfQM8JG6VzEwkxQHXzuquC8cOfF3NvYtXC3UwlFU9q0"
          alt="Oriontek Logo"
          className="h-14 w-14"
        />
        <p className="text-[#000] text-lg">Oriontek</p>
      </div>

      <ul className="flex gap-4 items-center">

        {isAuth &&
          <>
            <li>
              {user?.firstName}
            </li>

            <li>
              <button type="button" onClick={() => handleLogout()} className="bg-black px-4 py-2 text-white rounded-full" >Log Out</button>
            </li>

          </>

        }

        {!isAuth && <>
          <li>
            <button type="button" onClick={() => { router('/') }} className={isActiveRoute("/")}> Home</button>
          </li>
          <li>
            <button type="button" onClick={() => { router('/Auth/Login') }} className={isActiveRoute("/Auth/Login")}>Log in</button>
          </li>
          <li>
            <button type="button"
              className=" bg-[#6041fe] bg-gradient-to-r px-4 py-2 hover:bg-[#5331fc] rounded-full text-white shadow-md shadow-[#6141fe6f] "
              onClick={() => { router('/Auth/Register') }}
            >
              Sign Up
            </button>
          </li>
        </>}

      </ul>
    </nav>
  );
};

export default NavBar;
