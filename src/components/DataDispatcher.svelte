<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte"
    import CountrySelector from "./CountrySelector.svelte"
    import {toISODate} from "./dates"
    import BarChart from "./BarChart.svelte"

    interface ApiResponse {
        success: boolean
        data: Record<string, PricePair[]>
    }

    interface PricePair {
        timestamp: number
        price: number
    }

    export let priceDataForCountry: PricePair[] = []
    export let listOfCountries: string[]
    export let countryCode: string = ''

    let date: string
    let fetchedData: ApiResponse | null = null

    function getCountries(response: ApiResponse): string[] {
        const countries: string[] = []
        for (const countryCode in response.data) {
            countries.push(countryCode)
        }
        return countries
    }

    //TODO: remove required for troubleshooting Error throws
    function getPriceDataForCountry(response: ApiResponse, countryCode: string): PricePair[] {
        if (!response || !response.data) {
            throw new Error('Invalid response structure: "data" field is missing.')
        }

        const countryData = response.data[countryCode]
        if (!countryData) {
            throw new Error(`Data for country ${countryCode} is not available.`)
        }
        if (countryData.length !== 24) {
            throw new Error(`Data for ${countryCode} does not have 24 price entries.`)
        }

        return countryData.map((pricePair) => ({
            timestamp: convertTimestamp(pricePair.timestamp),
            price: parseFloat((pricePair.price * 0.1).toFixed(2))
        }))
    }

    function convertTimestamp(timestamp: number): number {
        const date = new Date(timestamp * 1000);
        return date.getHours();
    }

    async function fetchPrices(date: string) {
        const start = new Date(date + 'T00:00')
        const end = new Date(date + 'T23:59')

        const apiUrl = `https://dashboard.elering.ee/api/nps/price?start=${start.toISOString()}&end=${end.toISOString()}`

        try {
            const response = await fetch(apiUrl)
            const jsonData = await response.json()
            fetchedData = jsonData
            listOfCountries = getCountries(jsonData)
            if (isInitialFetch()) {
                countryCode = listOfCountries[0]
            }
            priceDataForCountry = getPriceDataForCountry(jsonData, countryCode)

        } catch (error) {
            console.log(error)
        }
    }

    function isInitialFetch() {
        return !listOfCountries.includes(countryCode)
    }

    $: fetchPrices(date)

    $: if (fetchedData && countryCode) {
        priceDataForCountry = getPriceDataForCountry(fetchedData, countryCode)
    }
</script>

<main>
    <div>
        <DateSwitcher bind:date/>
    </div>
    <div>
        <BarChart {priceDataForCountry}/>
    </div>
    <div>
        <CountrySelector {listOfCountries} bind:countryCode/>
    </div>
</main>