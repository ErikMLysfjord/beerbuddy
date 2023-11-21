import { SortDescendingOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import { SortingItem } from "../../types/types";

/**
 * This component is used as a more mobile friendly
 * alternative to the Ant Design Select component.
 * The component is used to select the sorting method.
 * @param items The items that are used to create the menu.
 */
const SortingButton = ({ items }: { items: SortingItem[] }) => {
  const { setSorting, sorting } = useContext(FilterContext);

  /**
   * Menu can be used to create a dropdown menu.
   * The menu is used to select the sorting method.
   * The menu cannot use set state functions directly,
   * so a handler function is used to set the sorting method.
   * @param key The key of the menu item that was clicked.
   */
  const handleMenuClick = ({ key }: { key: string }) => {
    setSorting(key);
  };

  /**
   * The menu is created using the Ant Design Menu component.
   * It is used as an overlay for the dropdown component.
   */
  const menu = (
    <Menu onClick={handleMenuClick} selectedKeys={[sorting]}>
      {items.map((item) =>
        item ? <Menu.Item key={item.key}>{item.label}</Menu.Item> : null
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button type="primary" icon={<SortDescendingOutlined />}></Button>
    </Dropdown>
  );
};
export default SortingButton;
