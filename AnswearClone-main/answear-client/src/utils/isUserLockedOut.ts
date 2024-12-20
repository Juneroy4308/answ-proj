import { formatISO } from "utils/formatDate.ts";

export const isUserLockedOut = (lockoutEnd: string | null): boolean => {
    if (lockoutEnd === null) return false;

    const lockoutEndDate = new Date(formatISO(lockoutEnd));

    return lockoutEndDate > new Date();
};
