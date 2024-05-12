import { User } from "@/vite-env";
import Headline from "./Headline";
import { Button } from "../ui/button";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const LoginArea = ({ user }: { user: User }) => {
  return (
    <>
      <Headline level={1}>
        Hello {user.firstname} {user.lastname},
      </Headline>
      <Headline level={3}>You are already loged in.</Headline>
      <div className="flex gap-x-3 my-4">
        <Button asChild size="lg">
          <Link to="/" replace>
            Go to Home
          </Link>
        </Button>
        <Logout />
      </div>
    </>
  );
};

export default LoginArea;
