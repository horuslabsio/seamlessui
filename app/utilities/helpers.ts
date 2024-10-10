export const formatCurrency = (currency: number) => {
  const amount = currency / 1e18;
  return amount || 0;
};
