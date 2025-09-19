import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index.js";
import { useSidebar } from "../context/SidebarContext";

const navItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/admin",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/admin/profile",
  },
  {
    name: "Management",
    icon: <TableIcon />,
    subItems: [
      { name: "Visa", path: "/admin/visa-management", pro: false },
      { name: "User", path: "/admin/user-management", pro: false },
    ],
  },
];

const othersItems = [
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/admin/signin", pro: false },
      { name: "Sign Up", path: "/admin/signup", pro: false },
    ],
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-2">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              } ${
                !isExpanded && !isHovered && !isMobileOpen
                  ? "justify-center px-2"
                  : "justify-start"
              }`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                } ${
                  !isExpanded && !isHovered && !isMobileOpen ? "mr-0" : "mr-3"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="flex-1 text-left">{nav.name}</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180 text-blue-700 dark:text-blue-400"
                        : "text-gray-400"
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive(nav.path)
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } ${
                  !isExpanded && !isHovered && !isMobileOpen
                    ? "justify-center px-2"
                    : "justify-start"
                }`}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center ${
                    isActive(nav.path)
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  } ${
                    !isExpanded && !isHovered && !isMobileOpen ? "mr-0" : "mr-3"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="flex-1 text-left">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-1 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                        isActive(subItem.path)
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <span className="flex-1">{subItem.name}</span>
                      <span className="flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              isActive(subItem.path)
                                ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            }`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              isActive(subItem.path)
                                ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                                : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                            }`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-40 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } ${
        isExpanded || isMobileOpen
          ? "w-72"
          : isHovered
          ? "w-72"
          : "w-20 lg:w-20"
      }`}
      onMouseEnter={() => !isExpanded && !isMobileOpen && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div
        className={`flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800 ${
          !isExpanded && !isHovered && !isMobileOpen
            ? "justify-center"
            : "justify-start"
        }`}
      >
        <Link to="/admin" className="flex items-center">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="h-8 w-auto dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
              />
              <img
                className="h-8 w-auto hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              className="h-8 w-8"
            />
          )}
        </Link>
      </div>

      {/* Navigation Content */}
      <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="flex-1 p-4">
          <div className="space-y-8">
            {/* Menu Section */}
            <div>
              <h2
                className={`mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider ${
                  !isExpanded && !isHovered && !isMobileOpen
                    ? "text-center"
                    : "text-left"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "MENU"
                ) : (
                  <HorizontaLDots className="w-5 h-5 mx-auto" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            {/* Others Section */}
            <div>
              <h2
                className={`mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider ${
                  !isExpanded && !isHovered && !isMobileOpen
                    ? "text-center"
                    : "text-left"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "OTHERS"
                ) : (
                  <HorizontaLDots className="w-5 h-5 mx-auto" />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
