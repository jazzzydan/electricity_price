<script lang="ts">
    import DateSwitcher from "./selectors/DateSwitcher.svelte"
    import CountrySelector from "./selectors/CountrySelector.svelte"
    import BarChart from "./barchart/BarChart.svelte"
    import LoadingBar from "./barchart/LoadingBar.svelte"
    import {getCountries, getPriceDataForCountry} from "../utilities/dataMapper"
    import {type ApiResponse, type CountryCode, exportElectricityPrices, type PricePair,} from "../utilities/apiClient"
    import {arePricesForToday, type ISODate} from "../utilities/dates"
    import {t} from "../i18n"
    import LanguageSelector from "./selectors/LanguageSelector.svelte"
    import CurrentPrice from "./selectors/CurrentPrice.svelte"
    import Calculator from "./calculator/Calculator.svelte"

    let priceDataForCountry: PricePair[] = []
    let listOfCountries: CountryCode[] = []
    let isToday: boolean
    let fetchedData: ApiResponse | null = null
    let loading: boolean
    let dataIsAvailable: boolean
    let showLoading: boolean = false
    export let countryCode: CountryCode
    export let date: ISODate

    async function electricityPricesDispatcher(date: ISODate) {
        loading = true
        showLoading = false

        setTimeout(() => {
            if (loading) {
                showLoading = true
                dataIsAvailable = true
            }
        }, 2000)

        try {
            fetchedData = await exportElectricityPrices(date)
            listOfCountries = getCountries(fetchedData)
            isToday = arePricesForToday(fetchedData)
            if (isInitialFetch()) {
                countryCode = listOfCountries[0]
            }
            priceDataForCountry = getPriceDataForCountry(fetchedData, countryCode)
            if (priceDataForCountry.length > 1) {
                dataIsAvailable = true
            }
        } catch (error) {
            dataIsAvailable = false
        } finally {
            loading = false
        }
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
        <h2>{t.title}</h2>
    </div>
    <div>
        <CountrySelector {listOfCountries} bind:countryCode/>
    </div>
    <div class="selectors-container">
        <div class="current-price">
            <CurrentPrice {countryCode}/>
        </div>
        <div class="date-selector">
            <DateSwitcher bind:date/>
        </div>
        <div class="language-selector">
            <LanguageSelector/>
        </div>
    </div>
    <div class="chart-container">
        {#if loading && showLoading}
            <div class="loading-wrapper">
                <LoadingBar/>
            </div>
        {:else if dataIsAvailable && priceDataForCountry.length > 1}
            <BarChart {priceDataForCountry} {isToday}/>
        {:else}
            <div>
                <p>{t.errorMessage.noPricesAvailable}</p>
                <p>{t.errorMessage.pricesAvailableLater}</p>
            </div>
        {/if}
    </div>
    <div>
        <Calculator {priceDataForCountry}/>
    </div>
</main>

<style>
    div {
        margin-bottom: 1em;
    }
    .selectors-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        gap: 20px;
        flex-wrap: wrap;
        padding: 0 15px;
    }
    .current-price {
        position: absolute;
        left: 0;
    }
    .date-selector {
        text-align: center;
        flex-grow: 1;
    }
    .language-selector {
        position: absolute;
        right: 0;
    }
    .chart-container {
        height: 64vh;
    }
    .loading-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>