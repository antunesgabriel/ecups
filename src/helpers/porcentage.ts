export function calcPorcentage(initial: number, end: number): number {
  if (initial === 0) {
    return end * 100;
  }

  return ((end - initial) / initial) * 100;
}
