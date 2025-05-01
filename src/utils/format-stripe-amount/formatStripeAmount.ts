

export const formatStripeAmount = (amount: number | null) => {
  if (amount === null) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100);
};