export const buildQueryParams = (filters: Record<string, any>): string => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, value.toString());
        }
    });

    return params.toString();
};
