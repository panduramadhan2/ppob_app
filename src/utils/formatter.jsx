export function numberWithCommas(x) {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberWithDots(x) {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
