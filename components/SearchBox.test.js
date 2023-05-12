import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import SearchBox from "./SearchBox"

describe('SearchBox component', () => {
  it('should render properly', () => {
    const history = [{searchStr: 'search1'},{searchStr: 'search2'},]
    render(
      <SearchBox history={history}/>
    );

    const search1 = screen.getByText("search1")
    const search2 = screen.getByText("search2")

    expect(search1).toBeInTheDocument()
    expect(search1).toHaveAttribute('href', "/?searchStr=search1")
    expect(search2).toBeInTheDocument()
    expect(search2).toHaveAttribute('href', "/?searchStr=search2")

  });
});
