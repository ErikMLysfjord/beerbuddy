import Sidebar from "../components/sidebar/Sidebar";
import Actionbar from "../components/actionbar/Actionbar";
import UserIntro from "../components/user-intro/UserIntro";
import BeerCard from "../components/beer-card/BeerCard";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appBody}>
      <section className={styles.mainSection}>
        <UserIntro />
        <Actionbar />
        <main>
          <BeerCard
            name="21st Amendment Bitter American"
            brewery="Nico Freccia breweries"
          />
          <BeerCard name="Borg Citra" brewery="Hansa-Borg" />
          <BeerCard
            name="Sierra Nevada Pale Ale"
            brewery="Sierra Nevada Brewing Co."
          />
          <BeerCard name="Mono Stereo Mosaic" brewery="To Øl" />
        </main>
      </section>
      <Sidebar />
    </div>
  );
}

export default App;
