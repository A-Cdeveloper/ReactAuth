import useSessionStorage from "@/hooks/useSessionStorage";
import { User } from "@/vite-env";
import { ReactNode, createContext } from "react";

type SessionProps = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setSessionStorageData: (data: SessionProps) => SessionProps | void;
  removeSessionStorageData: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useSessionStorage<SessionProps>("userSession", {
    user: null,
    accessToken: null,
    refreshToken: null,
  });

  const removeSessionStorageData = () => {
    sessionStorage.removeItem("userSession");
    setData({ user: null, accessToken: null, refreshToken: null });
  };

  const value = {
    user: data?.user,
    token: data?.accessToken,
    isAuthenticated: !!data?.accessToken,
    setSessionStorageData: setData,
    removeSessionStorageData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
