import type {ISODate} from "./dates";

export interface ApiResponse {
    success: boolean
    data: PricesByCountry
}

export type PricesByCountry = Record<CountryCode, PricePair[]>
export type CountryCode = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'}${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'}`

export interface PricePair {
    timestamp: number
    price: number
}

export function createEleringApiUrl(date: ISODate) {
    const start = new Date(date + 'T00:00')
    const end = new Date(date + 'T23:59')

    return `/api/nps/price?start=${start.toISOString()}&end=${end.toISOString()}`;
}

export async function fetchData(apiUrl: string) {
    try {
        return await fetch(apiUrl).then(response => response.json());
    } catch (error) {
        alert('Ooops! Something went wrong...')
        console.log(error)
    }
}

export async function exportElectricityPrices(date: ISODate): Promise<ApiResponse> {
    const apiUrl = createEleringApiUrl(date);
    return await fetchData(apiUrl)
}