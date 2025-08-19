import { createBrowserRouter } from "react-router-dom";
import DashboardPages from "../pages/main/dashboard/dashboard";
import MainLayout from "../layouts/mainLayout";
import CreateArticlePage from "@/pages/main/new-article/create";
import UpdateArticlePage from "@/pages/main/edit-article/update";
import ViewArticlePage from "@/pages/main/view-article/view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <DashboardPages />,
      },
      {
        path: "/create",
        element: <CreateArticlePage />,
      },
      {
        path: "/update/:id",
        element: <UpdateArticlePage />,
      },
      {
        path: "/view/:id",
        element: <ViewArticlePage />,
      },
    ],
  },
]);

export default router;
