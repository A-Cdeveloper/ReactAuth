import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SecureFiles from "./pages/SecureFiles";
import KontaktPage from "./pages/KontaktPage";

import RootLayout from "./pages/RootLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthContextProvider from "./context/auth-context";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/secure",
        element: (
          <ProtectedRoute>
            <SecureFiles />
          </ProtectedRoute>
        ),
      },
      {
        path: "/kontakt",
        element: (
          <ProtectedRoute>
            <KontaktPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
};

export default App;
