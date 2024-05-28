export const changeDate = (date: string): string => {
    const newDate = new Date(date);

    return newDate.toLocaleString("default", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
    });
};
