import Product from "components/Product";
import he from "he";

const ProductsList = ({ products }) => {
  return (
    <div>
      <div className="container">
        <div className="d-flex flex-wrap">
          {products.map((product, index) => (
            <Product
              key={index}
              name={he.decode(product.name)}
              image={{
                src: product.image.src,
                alt: product.image.alt,
              }}
              link={product.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
