import emoji from "../../assets/waving-emoji.svg";
import useWindowDimensions from "../../utils/useWindowDimensions";
import Logo from "../logo/Logo";
import styles from "./UserIntro.module.css";

const UserIntro = () => {
  const { width } = useWindowDimensions();

  if (width < 1000) {
    return (
      <>
        <header className={styles.headingWrapper}>
          <Logo />
          <div className={styles.profilePicture}></div>
        </header>
        <hr className={styles.separator} />
      </>
    );
  }
  return (
    <>
      <header className={styles.headingWrapper}>
        <div className={styles.profilePicture}></div>
        <h1 className={styles.heading}>
          <span className={styles.bold}>Welcome</span>, Per-Christian Ringnes
        </h1>
        <img className={styles.emoji} src={emoji} alt="Waving Emoji" />
      </header>
      <hr className={styles.separator} />
    </>
  );
};
export default UserIntro;
