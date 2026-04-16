import Link from "next/link";
import MyLinks from "./MyLinks";

const Navbar = () => {
  const navItems = [
    { path: "/", text: "Home" },
    { path: "/timeline", text: "Timeline" },
    { path: "/stats", text: "Stats" },
  ];

  return (
    <div className="navbar bg-base-100 px-4 md:px-10 shadow-sm">
    
      <div className="flex-1">
        <Link href="/" className="text-xl md:text-2xl font-bold">
          KeenKeeper
        </Link>
      </div>

    
      <div className="hidden md:flex p-2 gap-5">
        {navItems.map((item, index) => (
          <MyLinks key={index} href={item.path}>
            {item.text}
          </MyLinks>
        ))}
      </div>

  
      <div className="md:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            ☰
          </label>

          <ul className=" menu menu-sm dropdown-content mt-3 z-10 p-2 gap-3  shadow bg-base-100 rounded-box w-40">
            {navItems.map((item, index) => (
              <li key={index}>
                <MyLinks href={item.path}>{item.text}</MyLinks>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
