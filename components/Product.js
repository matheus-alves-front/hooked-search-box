import styles from "styles/Product.module.css";

const Product = ({ name, image, link }) => {
  return (
    <div className="col-lg-4 col-md-6 p-4">
      <div className="card mb-4">
        <div className="card-header">
          <div className={styles.minHeader}>
            <a href={link} target="_blank" id='product-title'>
              {name}
            </a>
          </div>
        </div>
        <div className="card-body">
          <div className={styles.cardBody}>
            <a href={link} target="_blank" id='product-image'>
              <img src={image.src} alt={image.alt} className={styles.productImage} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
