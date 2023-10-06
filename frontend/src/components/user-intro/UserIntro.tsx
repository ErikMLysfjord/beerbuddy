import emoji from "../../assets/waving-emoji.svg";
import styles from "./UserIntro.module.css";

const UserIntro = () => {
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
