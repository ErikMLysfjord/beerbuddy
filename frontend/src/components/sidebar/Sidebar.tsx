import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  children: React.ReactNode;
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
const Sidebar = ({ children }: SidebarProps) => {
  return (
    <section className={styles.container}>
      <div>
        <Logo />
        <section>{children}</section>
      </div>
    </section>
  );
};
export default Sidebar;
