// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import CoursesListHolder from "../../pages/CoursesListHolder";
import NewsSection from "../../pages/NewsSection";
import NewsListHolder from "../../pages/NewsListHolder";
import NewsDetailHolder from "../../pages/NewsDetailHolder";
import { EditNewsHolder } from "../../pages/EditNewsHolder";
import { AddNewsHolder } from "../../pages/AddNewsHolder";
import AddNewCourseHolder from "../../pages/AddNewCourseHolder";
import CourseDetailsHolder from "../../pages/CourseDetailsHolder";
import UserDetailsHolder from "../../pages/UserDetailsHolder";
import { CommentReceived } from "../../pages/CommentReceived";
import CommentAccept from "../../pages/CommentAccept";
import { CommentUnaccept } from "../../pages/CommentUnaccept";
import CommentsDetails from "../../pages/CommentsDetails";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/Login";

const Dashboard = lazy(() => import("../../pages/Dashboard"));
const Courses = lazy(() => import("../../pages/Courses"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const UserSection = lazy(() => import("../../pages/UserSection"));
const ArticleSection = lazy(() => import("../../pages/NewsSection"));
const CommentSection = lazy(() => import("../../pages/CommentSection"));
const TeacherSection = lazy(() => import("../../pages/TeacherSection"));
import AddNewUser from "./../../../views/apps/user/list/AddNewUser/AddNewUser";
import AddNewUserHolder from "./../../pages/AddNewUserHolder";

const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  { path: "/Login", element: <Login />, meta: { layout: "blank" } },

  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/UserSection",
    element: <UserSection />,
  },
  {
    path: "/AddNewUser",
    element: <AddNewUserHolder />,
  },
  {
    path: "/CoursesSection",
    element: <Courses />,
  },
  {
    path: "/CourseList",
    element: <CoursesListHolder />,
  },
  {
    path: "/NewsSection",
    element: <NewsSection />,
  },
  {
    path: "/NewsList",
    element: <NewsListHolder />,
  },
  {
    path: "/NewsDetail/:id",
    element: <NewsDetailHolder />,
  },
  {
    path: "/EditNews/:id",
    element: <EditNewsHolder />,
  },
  {
    path: "/AddNews",
    element: <AddNewsHolder />,
  },
  { path: "/CourseDetails", element: <CourseDetailsHolder /> },
  {
    path: "/addNewCourse",
    element: <AddNewCourseHolder />,
  },
  {
    path: "/ArticleSection",
    element: <ArticleSection />,
  },

  {
    element: <CommentSection />,
    path: "/Comments",
    meta: {
      appLayout: true,
      className: "email-application",
    },
    children: [
      { path: "/Comments/Recieved", element: <CommentReceived /> },
      { path: "/Comments/Recieved/Accept", element: <CommentAccept /> },
      { path: "/Comments/Recieved/UnAccept", element: <CommentUnaccept /> },
      {
        path: "/Comments/Details/:courseId/:commentsId",
        element: <CommentsDetails />,
      },
    ],
  },

  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/UserDetails",
    element: <UserDetailsHolder />,
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
