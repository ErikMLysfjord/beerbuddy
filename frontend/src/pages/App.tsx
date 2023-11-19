import Sidebar from "../components/sidebar/Sidebar";
import Actionbar from "../components/actionbar/Actionbar";
import UserIntro from "../components/user-intro/UserIntro";
import BeerList from "../components/beer-list/BeerList";
import Filters from "../components/filters/Filters";
import appStyles from "./App.module.css";
import protectRoute from "../utils/protectRoute";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    protectRoute();
  }, []);
  return (
    <div className={appStyles.appBody}>
      <section className={appStyles.mainSection} id="infiniteScrollTarget">
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
