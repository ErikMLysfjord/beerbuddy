import { FilterFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import styles from "./FilterButton.module.css";
import { useState } from "react";
import Filters from "../filters/Filters";

/**
 * The filter button component.
 * This is a more compact way of accessing the filters on mobile devices.
 * Contains a modal with the filters.
 * @returns - The filter button component.
 */
const FilterButton = () => {
  const [showFilter, setShowFilter] = useState(false);

  //hide filter when clicking escape button
  const handleClick = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className={styles.filterButtonWrapper}>
      {/*TODO: Should trigger this button on esc click */}
      <Button
        type="primary"
        icon={<FilterFilled />}
        onClick={handleClick}
      ></Button>
      <Modal
        title="Filters"
        open={showFilter}
        onCancel={handleClick}
        footer={null}
        width={1000}
      >
        <Filters />
      </Modal>
    </div>
  );
};
export default FilterButton;
