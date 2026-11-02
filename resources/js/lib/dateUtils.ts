import {
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
    isWeekend,
} from "date-fns";

/**
 * Returns the number of business days (Mon-Fri) in the given month.
 */
export function getBusinessDaysInMonth(date: Date): number {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end }).filter((d) => !isWeekend(d))
        .length;
}

/**
 * Returns the number of business days (Mon-Fri) elapsed from the start of the month through the given date.
 */
export function getBusinessDaysElapsed(date: Date): number {
    const start = startOfMonth(date);
    return eachDayOfInterval({ start, end: date }).filter((d) => !isWeekend(d))
        .length;
}
