import Sidebar from "../components/sidebar/Sidebar";
import Actionbar from "../components/actionbar/Actionbar";
import UserIntro from "../components/user-intro/UserIntro";
import BeerList from "../components/beer-list/BeerList";
import Filters from "../components/filters/Filters";
import useFetchMoreBeers from "../utils/useFetchMoreBeers";
import appStyles from "./App.module.css";
import protectRoute from "../utils/protectRoute";

function App() {
  protectRoute();
  const { beers, fetchMore } = useFetchMoreBeers();

  return (
    <div className={appStyles.appBody}>
      <section className={appStyles.mainSection} id="infiniteScrollTarget">
        <UserIntro />
        <Actionbar />
        <BeerList beers={beers} fetchMore={fetchMore} />
      </section>
      <Sidebar fetchMore={fetchMore}>
        <Filters />
      </Sidebar>
    </div>
  );
}

export default App;
