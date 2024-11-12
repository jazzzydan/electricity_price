export type ISODate = `${number}-${number}-${number}`

export const today: ISODate = toISODate(new Date())
export const tomorrow: ISODate = toISODate(new Date(new Date().setDate(new Date().getDate() + 1)));

export function toISODate(d: Date) {
    return d.toISOString().split('T')[0] as ISODate
}

export function arePricesAvailableFor(date: ISODate) {
    // TODO: what if tomorrow's prices are already available?
    return date < tomorrow
}


