import { Button } from "antd";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <section className={styles.container}>
      <div>
        <Logo />
        <main>{props.children}</main>
      </div>
      <Button type="primary">Apply Filters</Button>
    </section>
  );
};
export default Sidebar;
