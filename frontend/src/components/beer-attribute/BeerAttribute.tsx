import styles from "./BeerAttribute.module.css";

interface BeerAttributeProps {
  icon: string;
  altText: string;
  attribute: string;
  value: string | number | undefined;
}

const BeerAttribute = ({
  attribute,
  value,
  icon,
  altText,
}: BeerAttributeProps) => {
  return (
    <div className={styles.attributeContainer}>
      <div className={styles.attributeHeaderContainer}>
        <img height={"32px"} width={"20px"} src={icon} alt={altText} />
        <h3 className={styles.attributeHeading}>{attribute}</h3>
      </div>
      <p className={styles.attributeText}>{value}</p>
    </div>
  );
};
export default BeerAttribute;
