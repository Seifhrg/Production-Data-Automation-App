export const statusOptions = [
    { label: "Work Order Launched", code: "10" },
    { label: "Material Issued", code: "30" },
    { label: "Partial Receipt", code: "45" },
    { label: "Work Order Completed", code: "50" },
    { label: "Accounting Completed", code: "91" },
    { label: "Work Order Closed", code: "99" },
    { label: "Work Order Cancelled", code: "98" },
  ];


export const statusMap = {
  10: "Work Order Launched",
  30: "Material Issued",
  45: "Partial Receipt",
  50: "Work Order Completed",
  91: "Accounting Completed",
  99: "Work Order Closed",
  98: "Work Order Cancelled",
};