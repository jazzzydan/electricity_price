<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte"

    interface ApiResponse {
        success: boolean
        data: Record<CountryCode, PricePair[]>
    }

    export let countryCode: 'ee' | 'lv' | 'lt' | 'fi' = 'ee'

    interface PricePair {
        timestamp: number
        price: number
    }

    export let priceDataForCountry = []

    let error: string | undefined
    let loading = true
    let date: string

    function getPriceDataForCountry(response: ApiResponse, countryCode: CountryCode): number[] {
        if (!response || !response.data) {
            throw new Error('Invalid response structure: "data" field is missing.');
        }

        const countryData = response.data[countryCode];
        if (!countryData) {
            throw new Error(`Data for country ${countryCode} is not available.`);
        }
        if (countryData.length !== 24) {
            throw new Error(`Data for ${countryCode} does not have 24 price entries.`);
        }

        return countryData.map((pricePair) => pricePair.price)
    }

    async function fetchPrices(date: string) {
        const start = new Date(date)
        const end = new Date(date)
        end.setDate(end.getDate() + 1)

        const apiUrl = `https://dashboard.elering.ee/api/nps/price?start=${start.toISOString()}&end=${end.toISOString()}`

        loading = true
        error = null

        try {
            const response = await fetch(apiUrl)
            const jsonData = await response.json();
            priceDataForCountry = getPriceDataForCountry(jsonData, countryCode);

        } catch (err) {
            error = err.message
        } finally {
            loading = false
        }
    }

    $: fetchPrices(date)
</script>

<main>
    <div>
        <DateSwitcher bind:date/>
    </div>

    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else}
        <pre>{JSON.stringify(priceDataForCountry, null, 2)}</pre>
    {/if}
</main>