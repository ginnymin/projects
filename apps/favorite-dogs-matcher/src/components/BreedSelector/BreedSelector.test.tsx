import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BreedSelector } from '.';

jest.mock('@hooks/useFetchBreeds', () => ({
  useFetchBreeds: () => ({
    data: ['Australian Shepherd', 'Border Collie', 'Blue Heeler', 'Corgi'],
  }),
}));

const mockOnChange = jest.fn();

describe('Components: BreedSelector', () => {
  it('should render combobox without options', () => {
    render(<BreedSelector selectedBreeds={[]} onChange={mockOnChange} />);

    expect(
      screen.getByRole('combobox', { name: 'Filter by breed' })
    ).toBeVisible();
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.queryByRole('option')).toBeNull();
  });

  it('should show options when focused', async () => {
    render(<BreedSelector selectedBreeds={[]} onChange={mockOnChange} />);

    await userEvent.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeVisible();
      expect(screen.getAllByRole('option', { selected: false })).toHaveLength(
        4
      );
    });

    expect(
      screen.getByRole('option', { name: 'Australian Shepherd' })
    ).toBeVisible();
    expect(screen.getByRole('option', { name: 'Border Collie' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Blue Heeler' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Corgi' })).toBeVisible();
  });

  it('should show selected options', async () => {
    render(
      <BreedSelector
        selectedBreeds={['Border Collie', 'Corgi']}
        onChange={mockOnChange}
      />
    );

    await userEvent.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(
        screen.getByRole('option', { name: 'Border Collie', selected: true })
      ).toBeVisible();
      expect(
        screen.getByRole('option', { name: 'Corgi', selected: true })
      ).toBeVisible();
    });

    expect(screen.getAllByRole('option', { selected: false })).toHaveLength(2);
  });

  it('calls onChange when selecting an option', async () => {
    render(
      <BreedSelector selectedBreeds={['Corgi']} onChange={mockOnChange} />
    );

    await userEvent.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(
        screen.getByRole('option', {
          name: 'Australian Shepherd',
          selected: false,
        })
      ).toBeVisible();
    });

    await userEvent.click(
      screen.getByRole('option', { name: 'Australian Shepherd' })
    );

    expect(mockOnChange).toHaveBeenCalledWith(['Corgi', 'Australian Shepherd']);
  });
});
