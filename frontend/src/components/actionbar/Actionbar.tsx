import { Select, Input } from "antd";
import styles from "./Actionbar.module.css";
import FilterButton from "../filter-button/FilterButton";

const Actionbar = () => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.sortLabel}>
        Sort by
        <Select
          defaultValue="top"
          title="Sort by"
          style={{ width: 200 }}
          options={[
            { value: "top", label: "Most popular" },
            { value: "low", label: "Least popular" },
            { value: "atoz", label: "A-Z" },
            { value: "ztoa", label: "Z-A" },
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
