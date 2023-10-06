import { Select, Input } from "antd";
import styles from "./Actionbar.module.css";

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
    </div>
  );
};
export default Actionbar;
