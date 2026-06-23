// Vietnamese character encoding normalization for search
export const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD") // Split accents from letters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
