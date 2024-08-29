import { getPositions } from './getPositions';

describe('Components: Hand: getPositions', () => {
  it('calculates expected position', () => {
    const { x, y } = getPositions({ radius: 1, index: 0, sides: 4 });

    expect(x).toBe(1);
    expect(y).toBe(0);
  });

  it('calculates with offset', () => {
    const { x, y } = getPositions({
      radius: 1,
      index: 0,
      sides: 4,
      offset: { x: 1, y: 1 },
    });

    expect(x).toBe(2);
    expect(y).toBe(1);
  });

  it('calculates with offsetAngle', () => {
    const { x, y } = getPositions({
      radius: 1,
      index: 0,
      sides: 4,
      offsetAngle: -90,
    });

    // have to use Math.round() because it comes out to 6.123233995736766e-17;
    // because there is no way to represent π precisely
    expect(Math.round(x)).toBe(0);
    expect(y).toBe(-1);
  });
});
