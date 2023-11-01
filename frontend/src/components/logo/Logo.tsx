import styles from "./Logo.module.css";
import { CSSProperties } from "react";

const Logo = (props: { style?: CSSProperties | undefined }) => {
  return (
    <a style={props.style} className={styles.wrapper} href="/">
      <img src="/teku.svg" className={styles.icon} alt="BeerBuddy logo" />
      <h1 className={styles.heading}>BeerBuddy</h1>
    </a>
  );
};
export default Logo;
