import { Button } from "antd";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";
import useFetchMoreBeers from "../../utils/useFetchMoreBeers";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const { fetchMore } = useFetchMoreBeers();
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
