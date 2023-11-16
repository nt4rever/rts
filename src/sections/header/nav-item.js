import Link from "next/link";
import styles from "./nav-item.module.scss";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const NavItem = (props) => {
  const { href, name, onClick, active } = props;
  const { t } = useTranslation();

  return (
    <Link href={href} shallow className="rts" onClick={onClick}>
      <div
        className={classNames(styles.item, {
          [styles.active]: active,
        })}
      >
        {t(`home.nav.${name}`)}
      </div>
    </Link>
  );
};

export default NavItem;
