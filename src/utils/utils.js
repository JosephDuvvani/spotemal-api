const verifyPosition = (target, position, mapSize) => {
  const xPct = (position.x / mapSize.width) * 100;
  const yPct = (position.y / mapSize.height) * 100;

  const x = xPct >= target.x.start && xPct <= target.x.end;
  const y = yPct >= target.y.start && yPct <= target.y.end;

  if (x && y) return true;
  return false;
};

export { verifyPosition };
