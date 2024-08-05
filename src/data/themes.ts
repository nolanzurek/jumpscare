type ThemeRecord = Record<string, (i: number) => number>;

export const themes: ThemeRecord = {
  phi: (i) => (i * 98.722) % 360,
  sixths: (i) => (i * 60) % 360,
  brat: (i) => 80 + ((i * 67) % 40),
};
