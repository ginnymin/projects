import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { Modal, ModalTitle, CloseButton } from '.';

const mockOnClose = vi.fn();

describe('Component: Modal', () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders children', async () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <ModalTitle>Modal title</ModalTitle>
        This is some content
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible();
    });

    expect(
      screen.getByRole('heading', { name: 'Modal title', level: 2 })
    ).toBeVisible();
    expect(screen.getByText('This is some content')).toBeVisible();
  });

  it('does not render children', () => {
    render(
      <Modal open={false} onClose={mockOnClose}>
        <ModalTitle>Modal title</ModalTitle>
        This is some content
      </Modal>
    );

    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.queryByText('This is some content')).toBeNull();
  });

  it('calls onClose', async () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <ModalTitle>Modal title</ModalTitle>
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible();
    });

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape', charCode: 27 });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose with CloseButton', async () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <ModalTitle>Modal title</ModalTitle>
        <CloseButton>Close</CloseButton>
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
