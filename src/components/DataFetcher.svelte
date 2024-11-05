<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte"
    import {onMount} from "svelte"
    import {priceDataForCountry} from './shared'

    interface ApiResponse {
        success: boolean
        data: Record<CountryCode, PricePair[]>
    }

    let CountryCode: 'ee' | 'lv' | 'lt' | 'fi' = 'ee'

    interface PricePair {
        timestamp: number
        price: number
    }

    let error: string | undefined
    let loading = true
    let apiUrl: string
    let startDate: Date
    let endDate: Date

    onMount(() => {
        setApiUrl(startDate, endDate)
    })

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

    function setApiUrl(startDate: Date, endDate: Date) {
        const start = startDate.toISOString()
        const end = endDate.toISOString()
        apiUrl = `https://dashboard.elering.ee/api/nps/price?start=${start}&end=${end}`
        fetchData()
    }

    async function fetchData() {
        loading = true
        error = null

        if (!apiUrl) return

        try {
            const response = await fetch(apiUrl)
            const jsonData = await response.json();
            const prices = getPriceDataForCountry(jsonData, CountryCode);

            priceDataForCountry = prices;
        } catch (err) {
            error = err.message
        } finally {
            loading = false
        }
    }

    function handleDateChange(newStartDate: Date, newEndDate: Date) {
        startDate = newStartDate;
        endDate = newEndDate;
        setApiUrl(startDate, endDate);
    }

</script>

<main>
    <div>
        <DateSwitcher onDateChange={handleDateChange}/>
    </div>

    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else}
        <pre>{JSON.stringify(priceDataForCountry, null, 2)}</pre>
    {/if}
</main>