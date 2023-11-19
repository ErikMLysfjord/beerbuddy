import Sidebar from "../components/sidebar/Sidebar";
import Actionbar from "../components/actionbar/Actionbar";
import UserIntro from "../components/user-intro/UserIntro";
import BeerList from "../components/beer-list/BeerList";
import Filters from "../components/filters/Filters";
import useFetchMoreBeers from "../utils/useFetchMoreBeers";
import appStyles from "./App.module.css";
import { useEffect, useRef, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

function App() {
  if (
    !localStorage.getItem("userIdBeerBuddy") ||
    !localStorage.getItem("userNameBeerBuddy")
  ) {
    window.location.replace("/project2/login");
  }
  const { beers, fetchMore } = useFetchMoreBeers();

  const divRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    divRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    divRef.current?.addEventListener("scroll", () => {
      if (
        divRef.current?.scrollTop !== undefined &&
        divRef.current?.scrollTop > 100
      ) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <>
      <a href="#main" className={appStyles.skipLink}>
        Skip to main content
      </a>
      <div className={appStyles.appBody}>
        <Sidebar fetchMore={fetchMore}>
          <Filters />
        </Sidebar>
        <section
          className={appStyles.mainSection}
          id="infiniteScrollTarget"
          ref={divRef}
        >
          <UserIntro />
          <Actionbar />
          <BeerList beers={beers} fetchMore={fetchMore} />
          <div className={appStyles.toTopBtn}>
            {showTopBtn && (
              <FaAngleUp
                className={appStyles.iconStyle}
                onClick={scrollToTop}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
