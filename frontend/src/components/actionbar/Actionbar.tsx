import { Select, Input, Button } from "antd";
import styles from "./Actionbar.module.css";
import { FilterFilled } from "@ant-design/icons";

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
      <div className={styles.filterButtonWrapper}>
        <Button type="primary" icon={<FilterFilled />}></Button>
      </div>
    </div>
  );
};
export default Actionbar;
