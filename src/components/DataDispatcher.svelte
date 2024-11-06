<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte"
    import CountrySelector from "./CountrySelector.svelte"
    import {toISODate} from "./dates"

    interface ApiResponse {
        success: boolean
        data: Record<CountryCode, PricePair[]>
    }

    interface PricePair {
        timestamp: number
        price: number
    }

    export let priceDataForCountry = []
    export let listOfCountries = []
    export let countryCode: string = ''

    let error: string | undefined
    let loading = true
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
    function getPriceDataForCountry(response: ApiResponse, countryCode: CountryCode): number[] {
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

        return countryData.map((pricePair) => pricePair.price)
    }

    async function fetchPrices(date: string) {
        const start = new Date(date)
        const end = new Date(date)
        start.setDate(start.getDate() - 1)
        //TODO: update date.ts for winter and summer time difference

        const apiUrl = `https://dashboard.elering.ee/api/nps/price?start=${toISODate(start)}T23:00:00.000Z&end=${toISODate(end)}T22:59:59.999Z`

        loading = true
        error = null

        try {
            const response = await fetch(apiUrl)
            const jsonData = await response.json()
            fetchedData = jsonData
            listOfCountries = getCountries(jsonData)
            if (isInitialFetch()) {
                countryCode = listOfCountries[0]
            }
            priceDataForCountry = getPriceDataForCountry(jsonData, countryCode)

        } catch (err) {
            error = err.message
        } finally {
            loading = false
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
        <CountrySelector { listOfCountries } bind:countryCode/>
    </div>

    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else}
        <pre>{JSON.stringify(priceDataForCountry, null, 2)}</pre>
    {/if}
</main>