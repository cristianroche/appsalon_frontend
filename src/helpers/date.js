import { parse, formatISO, parseISO, format } from "date-fns";

export const convertToISO = (date) => {
  const newDate = parse(date, "MM/dd/yyyy", new Date());
  return formatISO(newDate);
};

export const convertToDisplayDate = (date) => {
  return format(parseISO(date), "PPPP");
};

export const convertToMMDDYYYY = (date) => {
  return format(parseISO(date), "MM/dd/yyyy");
};
