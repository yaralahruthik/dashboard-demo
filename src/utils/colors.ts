function getRandomColorHex() {
  const hue = Math.floor(Math.random() * 360);
  const lightness = Math.floor(Math.random() * 60) + 20;

  const lightColor = `hsl(${hue},100%,${lightness}%)`;
  const darkColor = `hsl(${hue},100%,${lightness - 50}%)`;

  return [darkColor, lightColor];
}

export const COLORS = new Array(20).fill(0).map(getRandomColorHex);
