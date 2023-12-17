import { Drawer } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Menu } from "react-feather";
import Account from "./account";
import styles from "./index.module.scss";
import NavItem from "./nav-item";

const mockData = [
  {
    href: "/",
    name: "home",
  },
  {
    href: "/forum",
    name: "forum",
  },
  {
    href: "/map",
    name: "map",
  },
  {
    href: "/posts",
    name: "post",
  },
  {
    href: "/about",
    name: "about",
  },
];

const Header = () => {
  const { pathname } = useRouter();
  const [navMobile, setNavMobile] = useState(false);

  const isActive = (path, href) => {
    if (href !== "/") return path.startsWith(href);
    return path === "/";
  };

  const navItems = mockData.map((item) => (
    <NavItem
      key={item.href}
      {...item}
      onClick={() => setNavMobile(false)}
      active={isActive(pathname, item.href)}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button onClick={() => setNavMobile(true)}>
          <Menu />
        </button>
        <Link href="/" className={classNames(styles.logo, "rts")}>
          RTS
        </Link>
      </div>

      <div className={styles.nav}>{navItems}</div>
      <Account />
      <Drawer
        anchor="left"
        open={navMobile}
        onClose={() => setNavMobile(false)}
        sx={{ zIndex: 3000 }}
      >
        <div className={styles.navMobile}>{navItems}</div>
      </Drawer>
    </div>
  );
};

export default Header;
