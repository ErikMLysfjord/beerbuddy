import { FilterFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import styles from "./FilterButton.module.css";
import { useState } from "react";
import Filters from "../filters/Filters";
import useFetchMoreBeers from "../../utils/useFetchMoreBeers";

const FilterButton = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { fetchMore } = useFetchMoreBeers();

  const handleClick = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className={styles.filterButtonWrapper}>
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
        <Filters fetchMore={fetchMore} />
      </Modal>
    </div>
  );
};
export default FilterButton;
