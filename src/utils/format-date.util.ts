export function formatDate(date: Date) : string {
    const sep = "/";
    
    return `${`${date.getDate()}`.padStart(2, "0")}${sep}${`${date.getMonth() + 1}`.padStart(2, "0")}${sep}${date.getFullYear()}`;
}