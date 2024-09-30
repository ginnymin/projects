import { render, screen } from '@testing-library/react';

import { DogDetail } from '.';

describe('Components: DogDetail', () => {
  it('renders', () => {
    render(
      <DogDetail
        id="12345"
        age={5}
        breed="Border Collie"
        img="https://img.com/12345"
        name="Bingo"
        zipCode="12345"
      />
    );

    const text = screen.getByText(/Hi, my name is/);

    expect(text).toBeVisible();
    expect(text).toHaveTextContent(
      "Hi, my name is Bingo! I'm a loving Border Collie and am 5 year(s) old. The zip code I live in is 12345. I can't wait to meet you!"
    );
    expect(screen.getByRole('presentation')).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Find another match' })
    ).toBeVisible();
  });
});
