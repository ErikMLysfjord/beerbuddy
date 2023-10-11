import Sidebar from "../components/sidebar/Sidebar";
import Actionbar from "../components/actionbar/Actionbar";
import UserIntro from "../components/user-intro/UserIntro";
import styles from "./App.module.css";
import BeerList from "../components/beer-list/BeerList";

function App() {
  return (
    <div className={styles.appBody}>
      <section className={styles.mainSection}>
        <UserIntro />
        <Actionbar />
        <BeerList />
      </section>
      <Sidebar />
    </div>
  );
}

export default App;
