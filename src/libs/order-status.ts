export function getOrderStatusBgColor(status: string) {
  switch (status) {
    case "pending":
      return "warning.light";
      break;
    case "processing":
      return "info.light";
      break;
    case "shipped":
      return "primary.main";
      break;
    case "delivered":
      return "success.light";
      break;

    case "cancelled":
      return "error.light";
      break;
    default:
      return "success.light";
  }
}

export function getOrderPaymentStatusBgColor(status: string) {
  switch (status) {
    case "pending":
      return "warning.light";
      break;
    case "paid":
      return "success.light";
      break;
    case "refunded":
      return "info.light";
      break;
    default:
      return "success.light";
  }
}
