import { Select, Input } from "antd";
import styles from "./Actionbar.module.css";
import FilterButton from "../filter-button/FilterButton";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

const Actionbar = () => {
  const { setSearchString, setSorting, sorting } = useContext(FilterContext);

  return (
    <section className={styles.wrapper}>
      <label className={styles.sortLabel}>
        Sort by
        <Select
          defaultValue={sorting}
          title="Sort by"
          style={{ width: 200 }}
          options={[
            { value: "top", label: "Most popular" },
            { value: "low", label: "Least popular" },
            { value: "atoz", label: "A-Z" },
            { value: "ztoa", label: "Z-A" },
          ]}
          onChange={(value) => setSorting(value)}
        />
      </label>
      <label className={styles.searchLabel}>
        Search
        <Input.Search
          onSearch={(value) => setSearchString(value.toLowerCase())}
        />
      </label>
      <FilterButton />
    </section>
  );
};
export default Actionbar;
