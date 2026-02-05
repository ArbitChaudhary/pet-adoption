export function formateDate(date: string | Date) {
  const d = new Date(date);
  const formatedDate = d.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
    day: "2-digit",
  });
  return formatedDate;
}
