import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecipeForm } from '.';

const mockOnSave = vi.fn();
const mockOnRemove = vi.fn();

describe('Components: RecipeForm', () => {
  beforeEach(() => {
    mockOnSave.mockClear();
    mockOnRemove.mockClear();
  });

  it('renders', () => {
    render(<RecipeForm onSave={mockOnSave} />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeVisible();
    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toBeVisible();
    expect(screen.getByRole('combobox', { name: 'Unit' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Ingredient' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Save recipe!' })).toBeDisabled();
    expect(
      screen.getByText(
        'No ingredients added yet! Add your first ingredient above.'
      )
    ).toBeVisible();
  });

  it('renders with pre-filled data', () => {
    render(
      <RecipeForm
        onSave={mockOnSave}
        name="My recipe"
        ingredients={[
          { quantity: 2, unit: 'tbsp', name: 'almond flour' },
          { quantity: 1, unit: 'cup', name: 'water' },
        ]}
      />
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue(
      'My recipe'
    );
    expect(
      screen.getAllByRole('spinbutton', { name: 'Quantity' })
    ).toHaveLength(3);
    expect(screen.getAllByRole('combobox', { name: 'Unit' })).toHaveLength(3);
    expect(screen.getAllByRole('textbox', { name: 'Ingredient' })).toHaveLength(
      3
    );
    expect(
      screen.getAllByRole('textbox', { name: 'Ingredient' })[1]
    ).toHaveValue('almond flour');
    expect(
      screen.getAllByRole('textbox', { name: 'Ingredient' })[2]
    ).toHaveValue('water');
  });

  it('enables add ingredient button', async () => {
    render(<RecipeForm onSave={mockOnSave} />);

    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Quantity' }),
      '1'
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Ingredient' }),
      'honey'
    );

    expect(screen.getByRole('button', { name: 'Add' })).toBeEnabled();
  });

  it('adds ingredient', async () => {
    render(<RecipeForm onSave={mockOnSave} />);

    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Quantity' }),
      '1'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Ingredient' }),
      'honey'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(
      screen.getAllByRole('spinbutton', { name: 'Quantity' })
    ).toHaveLength(2);
    expect(screen.getAllByRole('combobox', { name: 'Unit' })).toHaveLength(2);
    expect(screen.getAllByRole('textbox', { name: 'Ingredient' })).toHaveLength(
      2
    );
    expect(screen.getByRole('button', { name: 'Edit' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeEnabled();
  });

  it('removes ingredient', async () => {
    render(
      <RecipeForm
        onSave={mockOnSave}
        name="My recipe"
        ingredients={[
          { quantity: 2, unit: 'tbsp', name: 'almond flour' },
          { quantity: 1, unit: 'cup', name: 'water' },
        ]}
      />
    );

    await userEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getAllByRole('textbox', { name: 'Ingredient' })).toHaveLength(
      2
    );
  });

  it('enables save button', async () => {
    render(<RecipeForm onSave={mockOnSave} />);

    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Quantity' }),
      '1'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Ingredient' }),
      'honey'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByRole('button', { name: 'Save recipe!' })).toBeDisabled();

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Name' }),
      'smoothie'
    );

    expect(screen.getByRole('button', { name: 'Save recipe!' })).toBeEnabled();
  });

  it('calls onSave', async () => {
    render(<RecipeForm onSave={mockOnSave} />);

    await userEvent.type(
      screen.getByRole('spinbutton', { name: 'Quantity' }),
      '1'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Ingredient' }),
      'honey'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Name' }),
      'smoothie'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Save recipe!' }));

    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'smoothie',
      ingredients: [{ quantity: 1, name: 'honey', unit: 'tsp' }],
    });
  });

  it('calls onRemove', async () => {
    render(<RecipeForm onSave={mockOnSave} onRemove={mockOnRemove} />);

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(mockOnRemove).toHaveBeenCalled();
  });
});
