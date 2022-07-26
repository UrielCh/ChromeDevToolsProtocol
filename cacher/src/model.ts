export interface CacheModel {
    status: number;
    headers: Record<string, string>;
    binary: boolean,
    expires: number;
}
