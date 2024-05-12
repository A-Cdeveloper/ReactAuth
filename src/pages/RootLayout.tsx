import Header from "@/components/ui-project/Header";
import useAuth from "@/context/useAuth";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { isAuthenticated } = useAuth();

  const logedUserClass = "flex flex-col justify-center items-center";
  //logedUserClass = "";
  return (
    <>
      {isAuthenticated && <Header />}
      <main
        className={`container py-2 h-screen ${
          !isAuthenticated ? logedUserClass : ""
        }`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
