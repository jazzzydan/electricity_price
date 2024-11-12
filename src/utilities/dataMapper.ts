import type {ApiResponse, CountryCode, PricePair} from "./apiClient";

export function getCountries(response: ApiResponse): CountryCode[] {
    return Object.keys(response.data) as CountryCode[]
}

//TODO: remove required for troubleshooting Error throws
export function getPriceDataForCountry(response: ApiResponse, countryCode: CountryCode): PricePair[] {
    if (!response || !response.data) {
        throw new Error('Invalid response structure: "data" field is missing.')
    }

    const countryData = response.data[countryCode]
    if (!countryData) {
        throw new Error(`Data for country ${countryCode} is not available.`)
    }

    return countryData.map((pricePair) => ({
        timestamp: convertTimestamp(pricePair.timestamp),
        price: parseFloat((pricePair.price * 0.1).toFixed(2))
    }))
}

export function convertTimestamp(timestamp: number): number {
    const date = new Date(timestamp * 1000);
    return date.getHours();
}

