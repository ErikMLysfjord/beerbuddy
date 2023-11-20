import { Select, Input } from "antd";
import styles from "./Actionbar.module.css";
import FilterButton from "../filter-button/FilterButton";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import SortingButton from "../SortingButton/SortingButton";
import { SortingItem } from "../../types/types";

const Actionbar = () => {
  const { setSearchString, setSorting } = useContext(FilterContext);

  const items: SortingItem[] = [
    { key: "top", label: "Most popular" },
    { key: "low", label: "Least popular" },
    { key: "atoz", label: "A-Z" },
    { key: "ztoa", label: "Z-A" },
  ];

  return (
    <section className={styles.wrapper}>
      <label className={styles.sortLabel}>
        Sort by
        <Select
          defaultValue="top"
          title="Sort by"
          style={{ width: 200 }}
          options={items}
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
      <SortingButton items={items} />
    </section >
  );
};
export default Actionbar;
