import Header from "@/sections/header";
import styles from "./layout.module.scss";

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;