import useIsFetch from "@/hooks/useIsFetch";
import Header from "@/sections/header";
import styles from "./layout.module.scss";

const MainLayout = (props) => {
  const { children } = props;
  useIsFetch()

  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
