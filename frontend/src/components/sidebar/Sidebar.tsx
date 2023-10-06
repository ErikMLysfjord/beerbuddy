import { Button } from "antd";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <section className={styles.container}>
      <div>
        <Logo />
        <main>
          {/*
           * TODO: Add filters
           */}
        </main>
      </div>
      <Button type="primary">Apply Filters</Button>
    </section>
  );
};
export default Sidebar;
