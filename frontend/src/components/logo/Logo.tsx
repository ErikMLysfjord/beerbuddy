import styles from "./Logo.module.css";
import icon from "../../assets/hopsup.svg";

const Logo = () => {
  return (
    <a className={styles.wrapper} href="/">
      <img alt="logo" src={icon} className={styles.icon} />
      <h3 className={styles.heading}>HopsUp</h3>
    </a>
  );
};
export default Logo;
