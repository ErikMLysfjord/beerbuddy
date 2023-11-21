import { Select, Input } from "antd";
import styles from "./Actionbar.module.css";
import FilterButton from "../filter-button/FilterButton";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

/**
 * The actionbar component. Contains the sorting and search functionality.
 * @param fetchMore - function that is called when the apply filters button is clicked
 * @returns - The actionbar component.
 */
const Actionbar = ({
  fetchMore,
}: {
  fetchMore: (reset?: boolean, noFilters?: boolean) => Promise<void>;
}) => {
  const { setSearchString, setSorting } = useContext(FilterContext);
  return (
    <section className={styles.wrapper}>
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
          onChange={(value) => setSorting(value)}
        />
      </label>
      <label className={styles.searchLabel}>
        Search
        <Input.Search
          onSearch={(value) => setSearchString(value.toLowerCase())}
        />
      </label>
      <FilterButton fetchMore={fetchMore} />
    </section>
  );
};
export default Actionbar;
