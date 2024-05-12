import LoginArea from "@/components/ui-project/LoginArea";
import LoginForm from "@/components/ui-project/LoginForm";
import RegisterForm from "@/components/ui-project/RegisterForm";
import useAuth from "@/context/useAuth";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [modeSearchParams] = useSearchParams();

  let content;
  if (isAuthenticated) {
    content = user && <LoginArea user={user} />;
  } else {
    const mode = modeSearchParams.get("mode") as string;
    content = mode === "login" || !mode ? <LoginForm /> : <RegisterForm />;
  }

  return (
    <main className="container py-2 h-screen flex flex-col justify-center items-center">
      {content}
    </main>
  );
};

export default LoginPage;
