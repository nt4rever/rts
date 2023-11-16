import Link from "next/link";
import styles from "./nav-item.module.scss";
import classNames from "classnames";

const NavItem = (props) => {
  const { href, name, onClick, active } = props;

  return (
    <Link href={href} shallow className="rts" onClick={onClick}>
      <div
        className={classNames(styles.item, {
          [styles.active]: active,
        })}
      >
        {name}
      </div>
    </Link>
  );
};

export default NavItem;
