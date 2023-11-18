import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <section className={styles.container}>
      <div>
        <Logo />
        <main>{children}</main>
      </div>
    </section>
  );
};
export default Sidebar;
