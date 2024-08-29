import { render, screen, fireEvent } from '@testing-library/react';

import { Modal, ModalTitle, CloseButton } from '.';

const mockOnClose = jest.fn();

describe('Component: Modal', () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders children', () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <ModalTitle>Modal title</ModalTitle>
        This is some content
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeVisible();

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

  it('calls onClose', () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <ModalTitle>Modal title</ModalTitle>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape', charCode: 27 });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose with CloseButton', () => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <ModalTitle>Modal title</ModalTitle>
        <CloseButton>Close</CloseButton>
      </Modal>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
