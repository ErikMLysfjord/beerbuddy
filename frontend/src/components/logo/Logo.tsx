import styles from "./Logo.module.css";
import { CSSProperties } from "react";

const Logo = (props: { style?: CSSProperties | undefined }) => {
  return (
    <a style={props.style} className={styles.wrapper} href="/project2">
      <img
        src="/project2/teku.svg"
        className={styles.icon}
        alt="BeerBuddy logo"
      />
      <h1 className={styles.heading}>BeerBuddy</h1>
    </a>
  );
};
export default Logo;
