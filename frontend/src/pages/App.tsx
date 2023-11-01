import Sidebar from "../components/sidebar/Sidebar";
import Actionbar from "../components/actionbar/Actionbar";
import UserIntro from "../components/user-intro/UserIntro";
import styles from "./App.module.css";
import BeerList from "../components/beer-list/BeerList";
import Filters from "../components/filters/Filters";

function App() {
  if (
    !localStorage.getItem("userIdBeerBuddy") ||
    !localStorage.getItem("userNameBeerBuddy")
  ) {
    window.location.replace("/project2/login");
  }

  return (
    <div className={styles.appBody}>
      <section className={styles.mainSection} id="infiniteScrollTarget">
        <UserIntro />
        <Actionbar />
        <BeerList />
      </section>
      <Sidebar>
        <Filters />
      </Sidebar>
    </div>
  );
}

export default App;
