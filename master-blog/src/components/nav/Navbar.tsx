import NavLink from "./NavLink";

const Links = [
  {
    path: "/faq",
    label: "FAQS",
  },
  {
    path: "/logs",
    label: "Change logs",
  },
  {
    path: "/events",
    label: "Events",
  },
];

const Navbar = () => {
  return (
    <div className=" w-2/3 mx-auto">
      {Links.map((link, index) => (
        <NavLink key={index} path={link.path} label={link.label} />
      ))}
    </div>
  );
};

export default Navbar;
