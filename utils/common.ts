// 백분율 계산하는 함수
export const acalculatePercentage = (cnt: number, totalCnt: number): number => {
  return totalCnt === 0 ? 0 : Math.round((cnt / totalCnt) * 100);
}

// 숫자에 ,찍어주는 함수
export const toCommaSeparatedString = (number: number) => {
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
