export function getVariantForStatus(status) {
  switch (status) {
    case "To Do":
      return "danger";
    case "Doing":
      return "warning";
    case "Ready":
      return "success";
    default:
      return "secondary";
  }
}
