<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte"
    import CountrySelector from "./CountrySelector.svelte"
    import BarChart from "./BarChart.svelte"
    import {getCountries, getPriceDataForCountry} from "../utilities/dataMapper";
    import {exportElectricityPrices} from "../utilities/apiClient";

    interface ApiResponse {
        success: boolean
        data: Record<string, PricePair[]>
    }

    interface PricePair {
        timestamp: number
        price: number
    }

    export let priceDataForCountry: PricePair[] = []
    export let listOfCountries: string[] = []
    export let countryCode: string = ''
    export let date: string
    let fetchedData: ApiResponse | null = null

    function electricityPricesDispatcher(date: string) {
        fetchedData = exportElectricityPrices(date)
        listOfCountries = getCountries(fetchedData)
        if (isInitialFetch()) {
            countryCode = listOfCountries[0]
        }
        priceDataForCountry = getPriceDataForCountry(fetchedData, countryCode)
    }

    function isInitialFetch() {
        return !listOfCountries.includes(countryCode)
    }

    $: electricityPricesDispatcher(date)

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

<style>
    div{
      margin-bottom: 1em;
    }
</style>