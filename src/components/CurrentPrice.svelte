<script lang="ts">
    import {exportElectricityPrices, type PricePair, type CountryCode} from "../utilities/apiClient"
    import {today} from "../utilities/dates"
    import {getPriceDataForCountry} from "../utilities/dataMapper";

    export let countryCode: CountryCode
    let priceDataForCountry: PricePair[] = []
    let currentPrice: number | null = null

    async function fetchPriceData() {
        if (!countryCode) {
            console.error("Country code is not defined")
            return
        }
        try {
            const fetchedData = await exportElectricityPrices(today)
            priceDataForCountry = getPriceDataForCountry(fetchedData, countryCode)
            updateCurrentPrice()
        } catch (error) {
            console.error("Failed to fetch price data:", error)
        }
    }

    function getCurrentHour(): number {
        const date = new Date()
        return date.getHours()
    }

    function updateCurrentPrice() {
        const currentHour = getCurrentHour();
        const currentPricePair = priceDataForCountry.find(pair => {
            const hour = pair.timestamp
            return hour === currentHour
        });
        currentPrice = currentPricePair ? currentPricePair.price : null
    }

    $: if (countryCode) {
        fetchPriceData()
    }

    //TODO: implement i18n
    //TODO: check test coverage
</script>

<div class="current-price">
    {#if currentPrice !== null}
        <p>Current Price: {currentPrice} c/kWh</p>
    {:else}
        <p>Price not available</p>
    {/if}
</div>

<style>
    .current-price {
        font-family: Helvetica, serif;
        font-weight: bold;
        font-size: 16px;
        margin-right: auto;
    }
</style>