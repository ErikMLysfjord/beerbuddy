import Sidebar from "../components/sidebar/Sidebar";
import Actionbar from "../components/actionbar/Actionbar";
import UserIntro from "../components/user-intro/UserIntro";
import BeerList from "../components/beer-list/BeerList";
import Filters from "../components/filters/Filters";
import useFetchMoreBeers from "../utils/useFetchMoreBeers";
import appStyles from "./App.module.css";
import { useRef } from "react";

function App() {
  if (
    !localStorage.getItem("userIdBeerBuddy") ||
    !localStorage.getItem("userNameBeerBuddy")
  ) {
    window.location.replace("/project2/login");
  }
  const { beers, fetchMore } = useFetchMoreBeers();

  const mainRef = useRef<HTMLAnchorElement>(null);

  /**
   * Adds an event listener for the "Escape" key and executes the provided action when the key is pressed.
   * @param action The action to be executed when the "Escape" key is pressed.
   */
  const onEscape = (action: () => void) => {
    window &&
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          action();
        }
      });
  };
  onEscape(() => {
    mainRef.current?.focus();
  });

  return (
    <>
      <a href="#main" className={appStyles.skipLink} ref={mainRef}>
        Skip to main content
      </a>
      <div className={appStyles.appBody}>
        <Sidebar fetchMore={fetchMore}>
          <Filters />
        </Sidebar>
        <section className={appStyles.mainSection} id="infiniteScrollTarget">
          <UserIntro />
          <Actionbar />
          <BeerList beers={beers} fetchMore={fetchMore} />
        </section>
      </div>
    </>
  );
}

export default App;
