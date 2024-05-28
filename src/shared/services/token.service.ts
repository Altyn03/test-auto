import Cookies from "js-cookie";

export enum ETokens {
    sessionId = "JSESSIONID"
}

export const getTokenId = (): string | null => {
    const tokenId: string | undefined = Cookies.get(ETokens.sessionId);
    return tokenId ?? null;
};

export const removeTokenId = (): void => {
    Cookies.remove(ETokens.sessionId);
};
