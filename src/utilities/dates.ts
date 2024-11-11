export type ISODate = `${number}-${number}-${number}`

export const today: ISODate = toISODate(new Date())
export const availableDate: ISODate = toISODate(new Date(new Date().setDate(new Date().getDate() + 1)));

export function toISODate(d: Date) {
    return d.toISOString().split('T')[0] as ISODate
}

export function checkAvailableDate(date: ISODate) {
    return new Date(date) < new Date(availableDate)
}


