import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useAuth from "@/context/useAuth";
import { logout } from "@/lib/auth/user";

const Logout = () => {
  const { removeSessionStorageData, token } = useAuth();
  const navigate = useNavigate();
  return (
    <Button
      size="lg"
      variant="destructive"
      onClick={async () => {
        await logout(token);
        removeSessionStorageData();
        navigate("/");
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
