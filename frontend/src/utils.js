export const getChipVariantFromStatus = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "progressing":
      return "warning";
    case "draft":
    case "queued":
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
      return "Completed";
    case "progressing":
      return "Training in progress";
    case "draft":
    case "queued":
        return "Draft"
    case "failed":
        return "Failed"
    default:
      return "";
  }
}