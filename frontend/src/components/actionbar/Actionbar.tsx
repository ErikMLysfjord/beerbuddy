import { Select, Input } from "antd";
import styles from "./Actionbar.module.css";
import FilterButton from "../filter-button/FilterButton";

const Actionbar = () => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.sortLabel}>
        Sort by
        <Select
          defaultValue="Popularity"
          title="Sort by"
          style={{ width: 200 }}
          options={[
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ]}
        />
      </label>
      <label className={styles.searchLabel}>
        Search
        <Input.Search />
      </label>
      <FilterButton />
    </div>
  );
};
export default Actionbar;
