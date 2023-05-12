import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Product from './Product';

describe('Product component', () => {
  it('should render properly', () => {
    render(
      <Product
        name="Product name"
        link="link-to-product"
        image={{src: "link-to-image", alt: 'Product image'}}
      />
    );

    const productName = screen.getByText("Product name");
    const productImage = document.querySelector("img");
    
    expect(productName).toBeInTheDocument()
    expect(productName).toHaveAttribute('href', "link-to-product")
    expect(productImage).toHaveAttribute('src', "link-to-image")

  });
});
