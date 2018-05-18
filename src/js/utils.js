export const getDistance = (x1, y1, x2, y2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);
};

export const translate3d = (x, y, z) => `translate3d(${x * 64}px, ${y * 64}px, ${z * 64}px)`;
