export const formatISO = (dateString: string | null): string => {
    if (!dateString) return "Не вказано";

    // const regex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2}) ([+-]\d{2}:\d{2})$/;
    const regex = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2}) ([+-]\d{2}:\d{2})$/;
    const match = dateString.match(regex);

    if (!match) return "Невірна дата";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [_, month, day, year, hour, minute, second, timezone] = match;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, day, month, year, hour, minute, second, timezone] = match;

    return `${year}-${month}-${day}T${hour}:${minute}:${second}${timezone}`;
};

export const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Не вказано";

    const regex = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2}) ([+-]\d{2}:\d{2})$/;
    // const regex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2}) ([+-]\d{2}:\d{2})$/;

    const match = dateString.match(regex);

    if (!match) return "Невірна дата";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [_, month, day, year, hour, minute, second, timezone] = match;
    const [_, day, month, year, hour, minute, second, timezone] = match;

    const isoDate = `${year}-${month}-${day}T${hour}:${minute}:${second}${timezone}`;
    const date = new Date(isoDate);

    return date.toLocaleDateString("uk-UA");
};
