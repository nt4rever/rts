import useIsFetch from "@/hooks/useIsFetch";
import Header from "@/sections/header";
import styles from "./layout.module.scss";
import Footer from "@/sections/footer";

const MainLayout = (props) => {
  const { children } = props;
  useIsFetch();

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.section}>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
