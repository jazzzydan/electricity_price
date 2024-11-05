<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte"
    import {onMount} from "svelte";

    interface PricePair {
        timestamp: number, price: number
    }

    type CountryCode = 'ee'|'lv'|'lt'|'fi'

    let data: Record<CountryCode, Array<PricePair>> = {}
    let error: string | undefined
    let loading = true
    let apiUrl: string
    let startDate: Date
    let endDate: Date

    onMount(() => {
        setApiUrl()
    })

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