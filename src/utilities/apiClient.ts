interface ApiResponse {
    success: boolean
    data: Record<string, PricePair[]>
}

interface PricePair {
    timestamp: number
    price: number
}

export function createEleringApiUrl(date: string) {
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

export async function exportElectricityPrices(date: string) {
    const apiUrl = createEleringApiUrl(date);
    const jsonData: ApiResponse = await fetchData(apiUrl);
    return jsonData
}
