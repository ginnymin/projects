import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '.';

const mockOnChange = vi.fn();

describe('Components: Input', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders input', () => {
    render(<Input id="input" label="Input here" />);

    expect(screen.getByRole('textbox', { name: 'Input here' })).toBeVisible();
  });

  it('calls mockOnChange', async () => {
    render(<Input id="input" label="Input here" onChange={mockOnChange} />);

    await userEvent.type(screen.getByRole('textbox'), 'hello');

    expect(mockOnChange).toHaveBeenCalledTimes(5);
  });

  it('debounces mockOnChange', async () => {
    render(
      <Input
        id="input"
        label="Input here"
        onChange={mockOnChange}
        debounceDelay={1000}
      />
    );

    await userEvent.type(screen.getByRole('textbox'), 'hello');

    await waitFor(
      () => {
        expect(mockOnChange).toHaveBeenCalled();
      },
      { timeout: 1100 }
    );

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
