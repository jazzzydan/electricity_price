export type ISODate = `${number}-${number}-${number}`

export const today: ISODate = toISODate(new Date())
export const tomorrow: ISODate = toISODate(getTomorrow());

function getTomorrow() {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
}

export function toISODate(d: Date) {
    return d.toISOString().split('T')[0] as ISODate
}

export function arePricesAvailableFor(date: ISODate) {
    // TODO: what if tomorrow's prices are already available?
    return date < tomorrow
}