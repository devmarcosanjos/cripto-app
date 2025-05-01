import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { NotFound } from "./pages/not-found";
import { Layout } from "./components/layout";
import { Favorites } from "./pages/favorites";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:cripto",
        element: <Detail />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

export default router;