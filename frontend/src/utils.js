export const getChipVariantFromStatus = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "progressing":
      return "warning";
    case "drafted":
        return "muted"
    case "failed":
        return "error"
    default:
      return "";
  }
};

export const getChipValueFromStatus = (status) => {
    switch (status) {
    case "completed":
      return "Active";
    case "progressing":
      return "Training in progress";
    case "drafted":
        return "Draft"
    case "failed":
        return "Failed"
    default:
      return "";
  }
}