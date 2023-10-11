import Logo from "../components/logo/Logo";
import BeerContent from "../components/beer-content/BeerContent";
import CommentList from "../components/comment-list/CommentList";
import styles from "./Beer.module.css";

function BeerPage() {
  return (
    <div>
      <section className={styles.section}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="../../">
        <button className={styles.menuButton}>\- Back to menu</button>
        </a>
        <BeerContent />
        <CommentList />
      </section>
    </div>
  );
}

export default BeerPage;
