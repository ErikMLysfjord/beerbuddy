import { FilterFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import styles from "./FilterButton.module.css";
import { useEffect, useState } from "react";
import Filters from "../filters/Filters";
import useWindowDimensions from "../../utils/useWindowDimensions";

const FilterButton = ({
  fetchMore,
}: {
  fetchMore: (reset?: boolean, noFilters?: boolean) => Promise<void>;
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const { width } = useWindowDimensions();

  const handleClick = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    if (width > 1000) {
      setShowFilter(false);
    }
  }, [width]);

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
