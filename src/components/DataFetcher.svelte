<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte"
    import {onMount} from "svelte"

    interface PricePair {
        timestamp: number
        price: number
    }

    let CountryCode: 'ee'|'lv'|'lt'|'fi' = 'ee'

    interface ApiResponse {
        success: boolean
        data: Record<CountryCode, PricePair[]>
    }

    let data: Record<CountryCode, Array<PricePair>> | null = null
    let error: string | undefined
    let loading = true
    let apiUrl: string
    let startDate: Date
    let endDate: Date

    onMount(() => {
        setApiUrl()
    })

    function getPriceDataForCountry(response: ApiResponse, countryCode: CountryCode): number[] {
        // Ensure that the response and response.data exist
        if (!response || !response.data) {
            throw new Error('Invalid response structure: "data" field is missing.');
        }

        // Check if the countryCode exists within the data
        const countryData = response.data[countryCode];

        // If countryData is not found, throw an error
        if (!countryData) {
            throw new Error(`Data for country ${countryCode} is not available.`);
        }

        // Ensure there are exactly 24 price records
        if (countryData.length !== 24) {
            throw new Error(`Data for ${countryCode} does not have 24 price entries.`);
        }
        return countryData.map((pricePair) => pricePair.price)
    }

    function setApiUrl(startDate: Date, endDate: Date) {
        //TODO: Cannot read properties of undefined (reading 'toISOString')
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
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            data = await response.json()
            const pricesForEE = getPriceDataForCountry(response, CountryCode);
            console.log(pricesForEE)
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
        <DateSwitcher onDateChange={handleDateChange} />
    </div>

    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else}
        <pre>{JSON.stringify(data, null, 2)}</pre>
    {/if}
</main>