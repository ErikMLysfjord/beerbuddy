import { Button } from "antd";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  children: React.ReactNode;
  fetchMore: (reset?: boolean) => Promise<void>;
}

/**
 * Sidebar component that contains the BeerBuddy logo
 * and a main section for the filter components.
 * It also contains a button that applies the filter settings
 * to the search result.
 * @param children - filter components
 * @param fetchMore - function that is called when the apply filters button is clicked
 * @returns a Sidebar component
 */
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
