export function initials(fullName: string): string {
    const [last='', first=''] = fullName.split(',').map((part) => part.trim());
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}