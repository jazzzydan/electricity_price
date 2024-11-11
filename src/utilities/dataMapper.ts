interface ApiResponse {
    success: boolean
    data: Record<string, PricePair[]>
}

interface PricePair {
    timestamp: number
    price: number
}

export function getCountries(response: ApiResponse): string[] {
    const countries: string[] = []
    for (const countryCode in response.data) {
        countries.push(countryCode)
    }
    return countries
}

//TODO: remove required for troubleshooting Error throws
export function getPriceDataForCountry(response: ApiResponse, countryCode: string): PricePair[] {
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

