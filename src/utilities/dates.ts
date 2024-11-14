import type {ApiResponse} from "./apiClient";

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
    return date < tomorrow
}

//TODO: check test coverage
export function arePricesForToday(response: ApiResponse): boolean {
    const today = new Date().toDateString()
    let pricesDate: string = ''
    Object.values(response.data).some(pricePairs => {
        const middleIndex = Math.floor(pricePairs.length / 2);
        const pair = pricePairs[middleIndex];
        pricesDate = new Date(pair.timestamp * 1000).toDateString();
    });

    return pricesDate === today;
}
