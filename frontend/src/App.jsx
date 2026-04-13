import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import HomeLayout from "./layout/HomeLayout.jsx";
import QuestionsPage from "./pages/QuestionsPage.jsx";
import ExamsPage from "./pages/ExamsPage.jsx";
import CreateExamPage from "./pages/CreateExamPage.jsx";
import ExamDetailsPage from "./pages/ExamDetailsPage.jsx";
import StartExamPage from "./pages/StartExamPage.jsx";
import ExamResultPage from "./pages/ExamResultPage.jsx";
import ExportPage from "./pages/ExportPage.jsx";
import AppLayout from "./layout/AppLayout.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="/login" replace /> },
        { path: "login", element: <AuthPage /> },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Home /> },
            { path: "exam/:examId", element: <StartExamPage /> },
            { path: "exam/result/:examId", element: <ExamResultPage /> },
          ],
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute TeacherOnly>
              <DashboardLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Dashboard /> },
            {
              path: "exams",
              children: [
                { index: true, element: <ExamsPage /> },
                { path: "create", element: <CreateExamPage /> },
                { path: ":examId", element: <ExamDetailsPage /> },
              ],
            },
            { path: "export", element: <ExportPage /> },
            { path: "questions", element: <QuestionsPage /> },
            { path: "students", element: <div className="">Students</div> },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
