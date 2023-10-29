import Link from "next/link";
import styles from "./nav-item.module.scss";

const NavItem = (props) => {
  const { href, name } = props;

  return (
    <Link href={href} shallow className="rts">
      <div className={styles.item}>{name}</div>
    </Link>
  );
};

export default NavItem;
