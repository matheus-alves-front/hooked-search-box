import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductsList from './ProductsList';

describe('ProductsList component', () => {
  it('should render properly', () => {
    const products = [
      { name: 'product1', link: 'link1', image: { src: 'src1', alt: 'alt1' } },
      { name: 'product2', link: 'link2', image: { src: 'src2', alt: 'alt2' } },
      { name: 'product3', link: 'link3', image: { src: 'src3', alt: 'alt3' } },
    ];
    render(<ProductsList products={products} />);

    expect(screen.getByText("product1")).toBeInTheDocument()
    expect(screen.getByText("product2")).toBeInTheDocument()
    expect(screen.getByText("product3")).toBeInTheDocument()
  });
});
