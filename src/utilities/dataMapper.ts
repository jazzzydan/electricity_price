import type {ApiResponse, CountryCode, PricePair} from "./apiClient";

export function getCountries(response: ApiResponse): CountryCode[] {
    return Object.keys(response.data) as CountryCode[]
}

export function getPriceDataForCountry(response: ApiResponse, countryCode: CountryCode): PricePair[] {
    const countryData = response.data[countryCode]
    return countryData.map((pricePair) => ({
        timestamp: convertTimestamp(pricePair.timestamp),
        price: parseFloat((pricePair.price * 0.1).toFixed(2))
    }))
}

export function convertTimestamp(timestamp: number): number {
    const date = new Date(timestamp * 1000);
    return date.getHours();
}

export function getPriceByHour(hour: number, priceDataForCountry: PricePair[]): number {
    const pricePair = priceDataForCountry.find(pair => pair.timestamp === hour);
    if (!pricePair) {
        return 0;
    }

    return pricePair.price / 100;
}