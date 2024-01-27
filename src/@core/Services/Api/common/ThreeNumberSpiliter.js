export const ThreeNumberSpiliter = (num) => {
  const number = new Intl.NumberFormat("en-US", { style: "decimal" }).format(
    Number(num)
  );
  return number;
};
