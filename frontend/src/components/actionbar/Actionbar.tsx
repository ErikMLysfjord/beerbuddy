import { Select, Input } from "antd";
import styles from "./Actionbar.module.css";
import FilterButton from "../filter-button/FilterButton";

const Actionbar = () => {
  return (
    <div className={styles.wrapper}>
      <Select
        aria-label="Sort by"
        defaultValue="Popularity"
        style={{ width: 200 }}
        options={[
          { value: "asc", label: "Ascending" },
          { value: "desc", label: "Descending" },
          { value: "popularity", label: "Popularity" },
        ]}
      />
      <Input.Search aria-label="Searchbar" />
      <FilterButton />
    </div>
  );
};
export default Actionbar;
