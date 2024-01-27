import { Circle, Users } from "react-feather";
import { MdSpaceDashboard } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import { GoComment } from "react-icons/go";
import { PiChalkboardTeacher } from "react-icons/pi";

// /dd
export default [
  {
    id: "Dashboard",
    title: "داشبورد",
    icon: <MdSpaceDashboard />,
    navLink: "/Dashboard",
  },
  {
    id: "UserSection",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    navLink: "/UserSection",
    children: [
      {
        id: "usersLists",
        title: "لیست کاربران",
        icon: <Circle size={12} />,
        navLink: "/UserSection",
      },
      {
        id: "addnewuser",
        title: "افزودن کاربر جدید",
        icon: <Circle size={12} />,
        navLink: "/AddNewUser",
      },
      // {
      //   id: "UserDetails",
      //   title: "پروفایل کاربر",
      //   icon: <Circle size={12} />,
      //   navLink: "/UserDetails",
      // },
    ],
  },
  {
    id: "CoursesSection",
    title: "دوره ها",
    icon: <IoBookOutline />,
    navLink: "/CoursesSection",
    children: [
      {
        id: "courseList",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/CourseList",
      },
      {
        id: "addNewCourse",
        title: "افزودن دوره",
        icon: <Circle size={12} />,
        navLink: "/addNewCourse",
      },
    ],
  },
  {
    id: "NewsSection",
    title: "اخبار مقالات",
    icon: <LuNewspaper />,
    navLink: "/NewsSection",
    children: [
      {
        id: "NewsList",
        title: "لیست  اخبار",
        icon: <Circle size={12} />,
        navLink: "/NewsList",
      },
      {
        id: "AddNews",
        title: "افزودن خبر جدید",
        icon: <Circle size={12} />,
        navLink: "/AddNews",
      },
    ],
  },
  {
    id: "Comments",
    title: "مدیریت کامنت",
    icon: <GoComment />,
    navLink: "/Comments/Recieved",
  },
];
