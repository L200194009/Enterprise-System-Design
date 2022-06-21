export default function range(number) {
  try {
    return [...Array(Number(number)).keys()];
  } catch {
    return [];
  }
};
