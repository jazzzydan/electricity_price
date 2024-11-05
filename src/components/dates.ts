export const today = toISODate(new Date())

export function toISODate(d: Date) {
    return d.toISOString().split('T')[0]
}
