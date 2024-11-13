<script lang="ts">
    import DateSwitcher from "./DateSwitcher.svelte";
    import CountrySelector from "./CountrySelector.svelte";
    import BarChart from "./BarChart.svelte";
    import LoadingBar from "./LoadingBar.svelte";
    import {getCountries, getPriceDataForCountry} from "../utilities/dataMapper";
    import {
        type ApiResponse, type CountryCode,
        exportElectricityPrices, type PricePair,
    } from "../utilities/apiClient";
    import type {ISODate} from "../utilities/dates";
    import {changeLang, lang, t} from "../i18n";
    import LanguageSelector from "./LanguageSelector.svelte";


    export let priceDataForCountry: PricePair[] = [];
    export let listOfCountries: CountryCode[] = [];
    export let countryCode: CountryCode;
    export let date: ISODate;
    let fetchedData: ApiResponse | null = null;
    let loading: boolean
    let dataIsAvailable: boolean

    //TODO: implement "delayed loading" to show loading bar with short delay

    async function electricityPricesDispatcher(date: ISODate) {
        loading = true;
        dataIsAvailable = false;
        try {
            fetchedData = await exportElectricityPrices(date);
            listOfCountries = getCountries(fetchedData);
            if (isInitialFetch()) {
                countryCode = listOfCountries[0];
            }
            priceDataForCountry = getPriceDataForCountry(fetchedData, countryCode);

            if (priceDataForCountry.length > 1) {
                dataIsAvailable = true;
            }
        } catch (error) {
            dataIsAvailable = false;
        } finally {
            loading = false;
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


    <div class="selectors-container">

        <div class="date-selector">
            <DateSwitcher bind:date/>
        </div>

        <div class="language-selector">
            <LanguageSelector/>
        </div>
    </div>
    <div class="chart-container">
        {#if loading}
            <div class="loading-wrapper">
                <LoadingBar/>
            </div>
        {:else if dataIsAvailable}
            <BarChart {priceDataForCountry}/>
        {:else}
            <div>
                <p>{t.errorMessage.noPricesAvailable}</p>
                <p>{t.errorMessage.pricesAvailableLater}</p>
            </div>
        {/if}
    </div>
    <div>
        <CountrySelector {listOfCountries} bind:countryCode/>
    </div>
</main>

<style>
    div {
        margin-bottom: 1em;
    }
    /*Todo, change the positioning of DateSwitcher element, align to centre*/
    .selectors-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .date-selector {
        text-align: center;
        display: inline-block;
        flex-grow: 1;
        margin-right: 16px;
    }

    .language-selector {
        display: flex;
        justify-content: flex-end;
        margin-left: auto;
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