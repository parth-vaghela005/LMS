
import Login from "./pages/Login"
// import Navbar from './components/ui/Navbar'
import HeroSection from "./pages/student/HeroSection"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
// import Course from "./pages/student/Course";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
// import <Courses></Courses> from "./pages/student/Courses";
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
          element: <MyLearning />, // Add your MyLearning component here
        },
        {
          path: "profile",
          element: <Profile />, // Add your MyLearning component here
        },
      ],
    },
  ]);
  
  
  
  return (
    <main>
    <RouterProvider router={appRouter} />
    </main>
  )
}
