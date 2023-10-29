import Link from "next/link";
import styles from "./index.module.scss";
import classNames from "classnames";
import Account from "./account";
import NavItem from "./nav-item";

const mockData = [
  {
    href: "/home1",
    name: "home",
  },
  {
    href: "/home2",
    name: "forum",
  },
  {
    href: "/home3",
    name: "map",
  },
  {
    href: "/home4",
    name: "post",
  },
  {
    href: "/home5",
    name: "about",
  },
];

const Header = () => {
  const navItems = mockData.map((item) => (
    <NavItem key={item.href} {...item} />
  ));

  return (
    <div className={styles.container}>
      <Link href="/" className={classNames(styles.logo, "rts")}>
        RTS
      </Link>
      <div className={styles.nav}>{navItems}</div>
      <Account />
    </div>
  );
};

export default Header;
