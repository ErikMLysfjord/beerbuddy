import { QuestionCircleOutlined } from "@ant-design/icons";
import { Divider, Tooltip } from "antd";
import styles from "./Filter.module.css";

interface FilterProps {
  heading: string;
  tooltip: string;
  children: React.ReactNode;
}

/**
 * Filter component that contains an
 * interactive filter control component
 * and a heading with a tooltip.
 * @param heading
 * @param tooltip
 * @param children
 * @returns a Filter component
 */
const Filter = ({ heading, tooltip, children }: FilterProps) => {
  return (
    <>
      <Divider />
      <div className={styles.headingWrapper}>
        <h2>{heading}</h2>
        <Tooltip title={tooltip}>
          <QuestionCircleOutlined />
        </Tooltip>
      </div>
      {children}
    </>
  );
};
export default Filter;
