import { QuestionCircleOutlined } from "@ant-design/icons";
import { Divider, Tooltip } from "antd";
import styles from "./Filter.module.css";

interface FilterProps {
  heading: string;
  tooltip: string;
  children: React.ReactNode;
}

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
