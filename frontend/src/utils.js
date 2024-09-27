export const getChipVariantFromStatus = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "Training in progress":
      return "warning";
    case "Draft":
        return "muted"
    default:
      return "";
  }
};