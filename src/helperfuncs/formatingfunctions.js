export function formatMoney(money) {
  return money.toLocaleString();
}

export function formatNumberWithK(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}
