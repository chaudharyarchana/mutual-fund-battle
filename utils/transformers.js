// Transform API response to card format
// Transform API response to card format
export const transformSchemeToCard = (scheme) => {
  const categoryType = getCategoryType(scheme.category); //

  return {
    id: scheme.amfi_code || scheme.isin, // Updated to use amfi_code or ISIN
    type: categoryType, //
    name: truncateName(scheme.name), // Updated key from scheme_name to name
    subtitle: scheme.category || "N/A", //
    metric: "NAV",
    value: `₹${parseFloat(scheme.nav).toFixed(2)}`, // Formats NAV as currency
    progress: calculateProgress(scheme.day_change_pct), // Normalized progress based on change
    nav: scheme.nav, //
    expenseRatio: scheme.expense_ratio, //
    rating: scheme.morningstar || 0, // Updated key from rating to morningstar
    color: getCategoryColor(categoryType), //
  };
};

const getCategoryType = (category) => {
  if (!category) return "HYBRID"; //
  const categoryLower = category.toLowerCase(); //
  if (
    categoryLower.includes("equity") ||
    categoryLower.includes("stock") ||
    categoryLower.includes("cap")
  ) {
    return "EQUITY"; //
  }
  if (
    categoryLower.includes("debt") ||
    categoryLower.includes("bond") ||
    categoryLower.includes("income")
  ) {
    return "DEBT"; //
  }
  return "HYBRID"; //
};

const getCategoryColor = (type) => {
  switch (type) {
    case "EQUITY":
      return "#FFD700"; //
    case "DEBT":
      return "#7B91B3"; //
    case "HYBRID":
      return "#5A7C9E"; //
    default:
      return "#8EA3B8"; //
  }
};

const truncateName = (name) => {
  if (!name) return "Unknown Fund"; //
  let cleanName = name
    .replace(/- Direct Plan/gi, "")
    .replace(/- Regular Plan/gi, "")
    .replace(/- Growth/gi, "")
    .trim(); //
  return cleanName.length > 25 ? cleanName.substring(0, 22) + "..." : cleanName; //
};

const calculateProgress = (change) => {
  if (!change && change !== 0) return 0.5;
  // Normalizes a -5% to +5% range to 0.0 to 1.0 for the progress bar
  const normalized = (change + 5) / 10;
  return Math.max(0, Math.min(1, normalized));
};

// Format return value
const formatReturn = (returnValue) => {
  if (!returnValue && returnValue !== 0) return "N/A";

  const numValue = parseFloat(returnValue);
  if (isNaN(numValue)) return "N/A";

  const sign = numValue >= 0 ? "+" : "";
  return `${sign}${numValue.toFixed(1)}%`;
};
