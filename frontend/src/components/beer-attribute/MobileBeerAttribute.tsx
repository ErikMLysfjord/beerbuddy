import styles from "./BeerAttribute.module.css";
import { BeerAttributeProps } from "./BeerAttribute";

interface MobileBeerAttributeProps {
  attributeProps: BeerAttributeProps[];
}

const MobileBeerAttribute = ({ attributeProps }: MobileBeerAttributeProps) => {
  return (
    <div className={styles.mobileContainer}>
      {attributeProps.map((prop) => {
        if (prop.value !== null) {
          return (
            <div>
              <div className={styles.mobileHeaderContainer}>
                <img
                  height={"32px"}
                  width={"20px"}
                  src={prop.icon}
                  alt={prop.altText}
                />
                <div className={styles.textContainer}>
                  <h3 className={styles.mobileHeading}>{prop.attribute}</h3>
                  <p className={styles.mobileText}>{prop.value}</p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default MobileBeerAttribute;
