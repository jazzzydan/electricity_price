<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte"
    import CountrySelector from "./CountrySelector.svelte"
    import BarChart from "./BarChart.svelte"
    import {getCountries, getPriceDataForCountry} from "../utilities/dataMapper";
    import {
        type ApiResponse, type CountryCode,
        exportElectricityPrices, type PricePair,
    } from "../utilities/apiClient";
    import type {ISODate} from "../utilities/dates";

    export let priceDataForCountry: PricePair[] = []
    export let listOfCountries: CountryCode[] = []
    export let countryCode: CountryCode
    export let date: ISODate
    let fetchedData: ApiResponse | null = null

    async function electricityPricesDispatcher(date: ISODate) {
        fetchedData = await exportElectricityPrices(date)
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
    <div><h2>ELECTRICITY PRICES CHART</h2></div>
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