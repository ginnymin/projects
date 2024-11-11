import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dog } from '.';

const mockSelect = vi.fn();

describe('Components: Dog', () => {
  it('renders', () => {
    render(
      <Dog
        id="12345"
        age={5}
        breed="Border Collie"
        img="https://img.com/12345"
        name="Bingo"
        zipCode="12345"
      />
    );

    expect(screen.getByRole('presentation')).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Bingo' })).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Select as a favorite' })
    ).toBeVisible();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Breed: Border Collie');
    expect(listItems[1]).toHaveTextContent('Age: 5');
    expect(listItems[2]).toHaveTextContent('Zip code: 12345');
  });

  it('renders selected state', () => {
    render(
      <Dog
        id="12345"
        age={5}
        breed="Border Collie"
        img="https://img.com/12345"
        name="Bingo"
        zipCode="12345"
        selected
      />
    );

    expect(
      screen.getByRole('button', { name: 'De-select as a favorite' })
    ).toBeVisible();
  });

  it('calls onSelect when clicked', async () => {
    render(
      <Dog
        id="12345"
        age={5}
        breed="Border Collie"
        img="https://img.com/12345"
        name="Bingo"
        zipCode="12345"
        onSelect={mockSelect}
      />
    );

    await userEvent.click(screen.getByText('Bingo'));

    expect(mockSelect).toHaveBeenCalledWith({
      age: 5,
      breed: 'Border Collie',
      id: '12345',
      img: 'https://img.com/12345',
      name: 'Bingo',
      zipCode: '12345',
    });
  });
});
