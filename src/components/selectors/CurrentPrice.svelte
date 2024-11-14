<script lang="ts">

    import {type CountryCode, exportElectricityPrices, type PricePair} from "../../utilities/apiClient";
    import {today} from "../../utilities/dates";
    import {getPriceDataForCountry} from "../../utilities/dataMapper";
    import {t} from "../../i18n";

    export let countryCode: CountryCode
    let priceDataForCountry: PricePair[] = []
    let currentPrice: number | null = null

    async function getCurrentPrice(){
        if(!countryCode) {
            console.error("Country is not selected")
            return
        }
        try{
            const fetchedData = await exportElectricityPrices(today)
            priceDataForCountry = getPriceDataForCountry(fetchedData,countryCode)
            updateCurrentPrice()
        } catch (error) {
            console.error("Failed to retrieve price: ", error)
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
        getCurrentPrice()
    }

    //TODO: check test coverage

</script>

<div class="current-price">
    {#if currentPrice !== null}
        <p>{t.currentPrice} {currentPrice} {t.units.cents}/{t.units.kWh}</p>
    {:else}
        <p>{t.errorMessage.currentPriceNotAvailable}</p>
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