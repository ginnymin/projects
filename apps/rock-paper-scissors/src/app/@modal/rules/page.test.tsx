import { render, screen } from '@testing-library/react';

import { Modal } from '@components/Modal';

import Page from './page';

const mockDismiss = jest.fn();

describe('App router: Rules', () => {
  it('renders rules', () => {
    render(
      <Modal open onClose={mockDismiss}>
        <Page />
      </Modal>
    );

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
