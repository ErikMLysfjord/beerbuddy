import styles from "./BeerAttribute.module.css";

export interface BeerAttributeProps {
  icon: string;
  altText: string;
  attribute: string;
  value: string | number | undefined;
}

/**
 * A component for displaying a beer attribute.
 * This is used to display more detailed information about a beer.
 * @param icon - The icon to display.
 * @param altText - The alt text for the icon.
 * @param attribute - The attribute heading.
 * @param value - The value of the attribute.
 * @returns - The beer attribute component.
 */
const BeerAttribute = ({
  attribute,
  value,
  icon,
  altText,
}: BeerAttributeProps) => {
  return (
    <div className={styles.attributeContainer} aria-label={attribute}>
      <div className={styles.attributeHeaderContainer}>
        <img height={"32px"} width={"20px"} src={icon} alt={altText} />
        <h3 className={styles.attributeHeading}>{attribute}</h3>
      </div>
      <p className={styles.attributeText}>{value}</p>
    </div>
  );
};
export default BeerAttribute;
