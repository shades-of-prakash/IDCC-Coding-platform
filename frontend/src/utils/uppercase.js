export function uppercase(str) {
    if (!str) return ""; // Handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
}
