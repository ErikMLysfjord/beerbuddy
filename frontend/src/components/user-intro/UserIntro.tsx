import emoji from "/beerEmoji.svg";
import useWindowDimensions from "../../utils/useWindowDimensions";
import Logo from "../logo/Logo";
import styles from "./UserIntro.module.css";

/**
 * UserIntro component that greets a logged in user with their username.
 * @returns a UserIntro component
 */
const UserIntro = () => {
  const { width } = useWindowDimensions();
  if (width < 1000) {
    return (
      <>
        <header className={styles.headingWrapper}>
          <Logo />
        </header>
        <hr className={styles.separator} />
      </>
    );
  }
  return (
    <>
      <header className={styles.headingWrapper}>
        <h1 className={styles.heading}>
          <span className={styles.bold}>Welcome</span>,{" "}
          {localStorage.getItem("userNameBeerBuddy")
            ? localStorage.getItem("userNameBeerBuddy")
            : ""}
        </h1>
        <img className={styles.emoji} src={emoji} alt="Beer clinking Emoji" />
      </header>
      <hr className={styles.separator} />
    </>
  );
};
export default UserIntro;
