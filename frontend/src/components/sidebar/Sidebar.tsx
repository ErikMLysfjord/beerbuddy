import { Button } from "antd";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  children: React.ReactNode;
  fetchMore: (reset?: boolean) => Promise<void>;
}

const Sidebar = ({ children, fetchMore }: SidebarProps) => {
  return (
    <section className={styles.container}>
      <div>
        <Logo />
        <main>{children}</main>
      </div>
      <Button
        type="primary"
        onClick={(e) => {
          e.preventDefault();
          fetchMore(true);
        }}
      >
        Apply Filters
      </Button>
    </section>
  );
};
export default Sidebar;
