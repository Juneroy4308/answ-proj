import { jwtDecode } from "jwt-decode";

interface TokenData {
    exp: number;
    [key: string]: any;
}
export const checkTokenExpiration = (token: string | null) => {
    if (!token) {
        return false;
    }

    try {
        const tokenData = jwtDecode(token);

        if (tokenData.exp) {
            const expirationTime = tokenData.exp * 1000;
            return expirationTime > Date.now();
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
};

export const checkIsAdmin = (token: string | null): boolean => {
    if (!token) {
        return false;
    }

    try {
        const tokenData: TokenData = jwtDecode(token);
        return tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin";
    } catch (error) {
        return false;
    }
};
