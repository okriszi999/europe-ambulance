import dayjs from "dayjs";

export function formatDate(date: Date | undefined) {
  if (date === undefined) return "0000.00.00";
  return dayjs(date).format("YYYY.MM.DD");
}
