import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Services",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "Sponsor Licence",
        newTab: false,
        path: "/services/sponsor-licence",
      },

      {
        id: 52,
        title: "Compliance",
        newTab: false,
        path: "/services/compliance",
      },

      {
        id: 53,
        title: "Skilled Worker Visa",
        newTab: false,
        path: "/services/skilled-worker-visa",
      },
      {
        id: 54,
        title: "Other Services",
        newTab: false,
        path: "/services/other-services",
      },
    ],
  },
  {
    id: 6,
    title: "Offers",
    newTab: false,
    path: "/offers",
  },
  {
    id: 2,
    title: "About Us",
    newTab: false,
    path: "/about-us",
  },
  {
    id: 3,
    title: "Blog",
    newTab: false,
    path: "/blog/category/show-all",
  },
  {
    id: 4,
    title: "Free Stuff",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Resources",
        newTab: false,
        path: "/resources",
      },
      {
        id: 43,
        title: "SOC Code & Salary Finder",
        newTab: false,
        path: "/soc-code-finder",
      },
      {
        id: 42,
        title: "Calculator",
        newTab: false,
        path: "/calculator",
      },
    ],
  },
];

export default menuData;
