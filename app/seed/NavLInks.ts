interface NavLink {
  label: string;
  url: string;
}

export const links: NavLink[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/user/about",
  },
  {
    label: "Privacy",
    url: "/user/privacy",
  },
  {
    label: "Contact",
    url: "/user/contact",
  },
  {
    label: "Profile",
    url: "/user/profile",
  },
  {
    label: "Billing",
    url: "/user/billing",
  },
];
