import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import SearchPage from "./pages/student/SearchPage";
import DirectPaymentForm from "./pages/student/DirectPaymentForm";
import PaymentSuccessPage from "./pages/student/PaymentSuccessPage";
import MyCourse from "./pages/student/mycourse";
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
          path: "payment",
          element: <DirectPaymentForm />,
        },
        {
          path: "payment-success",
          element: <PaymentSuccessPage />,
        },

       
        {
          path: "course/search",
          element: (
            // <ProtectedRoute>
              <SearchPage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "course-detail/:courseId",
          element: <CourseDetail />,
        },
        {
          path: "course-progress/:courseId",
          element: <MyCourse />,
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
            {
              path: "course/:courseId",
              element: <EditCourse />,
            },
            {
              path: "course/:courseId/lecture/",
              element: <CreateLecture/>,
            },
            // {
            //   path: "course/:courseId/lecture/:",
            //   element: <EditLecture/>,
            // },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: <EditLecture/>,
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
