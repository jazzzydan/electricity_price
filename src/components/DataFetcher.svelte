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

    onMount(() => {
        setApiUrl()
    })

    function setApiUrl() {
        const start = startDate.toISOString()
        const end = endDate.toISOString()
        apiUrl = `https://dashboard.elering.ee/api/nps/price?start=${start}&end=${end}`
        onApiUrlChange(apiUrl)
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

    function handleApiUrlChange(newApiUrl: string) {
        apiUrl = newApiUrl
        fetchData()
    }

</script>

<main>
    <div>
        <DateSwitcher onApiUrlChange={handleApiUrlChange}/>
    </div>
</main>