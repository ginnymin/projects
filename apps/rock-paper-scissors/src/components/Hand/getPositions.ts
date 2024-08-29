type Options = {
  index: number;
  offset?: { x: number; y: number };
  offsetAngle?: number;
  radius: number;
  sides: number;
};

/**
 * Calculates (x,y) positions based on index and type of symmetrical shape.
 *
 * @param {object} options - Options type
 * @param {number} options.index - index of current point
 * @param {number} [options.offset={x:0, y:0}] - optional, defaults to { x: 0, y: 0 }
 * @param {number} [options.offsetAngle=0] - offset angle (in degrees); optional, defaults to 0
 * @param {number} options.radius - distance to a point from the center of the shape.
 * @param {number} options.sides - sides = 5 for a pentagon.
 */
export const getPositions = ({
  index,
  offset = { x: 0, y: 0 },
  offsetAngle = 0,
  radius,
  sides,
}: Options) => {
  const angle = (360 / sides) * index + offsetAngle;
  const radian = (angle * Math.PI) / 180;

  const x = radius * Math.cos(radian) + offset.x;
  const y = radius * Math.sin(radian) + offset.y;

  return { x, y };
};
