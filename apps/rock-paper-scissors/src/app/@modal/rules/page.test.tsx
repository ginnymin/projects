import { render, screen, waitFor } from '@testing-library/react';

import { Modal } from '@components/Modal';

import Page from './page';

const mockDismiss = vi.fn();

describe('App router: Rules', () => {
  it('renders rules', async () => {
    render(
      <Modal open onClose={mockDismiss}>
        <Page />
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeVisible();
    });

    expect(
      screen.getByRole('heading', { name: 'Rules', level: 2 })
    ).toBeVisible();

    expect(screen.getByRole('button', { name: 'Close rules' })).toBeVisible();
    expect(
      screen.getByRole('img', {
        name: /Scissors beats Paper. Paper beats Rock./,
      })
    ).toBeVisible();
  });
});
