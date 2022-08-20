export function serializeStrArray(str: string | string[]) : string {
    if (Array.isArray(str)) return str.join(',');
    return str;
}
