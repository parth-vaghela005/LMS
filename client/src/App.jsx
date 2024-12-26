import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
// import Sidebar from "./pages/admin/Dashboard";
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'


export default function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection />
              <Courses />
            </>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "my-learning",
          element: <MyLearning />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "admin",
          element: (
        
              <Sidebar />
           
          ),
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "course",
              element: <CourseTable/>,
            },
            {
              path: "course/create",
              element: <AddCourse />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}
