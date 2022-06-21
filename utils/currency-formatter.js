export default function currencyFormatter(value) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return formatter.format(value);
}
