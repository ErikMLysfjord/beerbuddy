import styles from "./Logo.module.css";
import icon from "../../assets/hopsup.svg";
import { CSSProperties } from "react";

const Logo = (props: { style?: CSSProperties | undefined }) => {
  return (
    <a style={props.style} className={styles.wrapper} href="/">
      <img alt="HopsUp logo" src={icon} className={styles.icon} />
      <h2 className={styles.heading}>HopsUp</h2>
    </a>
  );
};
export default Logo;
