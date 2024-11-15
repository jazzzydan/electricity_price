<script lang="ts">
    import DeviceSelector from "./DeviceSelector.svelte"
    import CalculatedOutput from "./CalculatedOutput.svelte"
    import devices from "./devices.json"
    import type {PricePair} from "../../utilities/apiClient";
    import {getPriceByHour} from "../../utilities/dataMapper";
    import UserInput from "./UserInput.svelte";
    import {t} from "../../i18n";

    let deviceId: string
    let powerKW: number
    let totalPrice: number
    let loadingTime: number = 1
    let price: number
    export let priceDataForCountry: PricePair[]

    type Device = {
        watts: number
    }

    // TODO: rename get-function should return stuff
    function getPower(deviceId: string) {
        // TODO: remove Object
        const device = Object(devices)[deviceId] as Device
        powerKW = device.watts / 1000
    }

    function calculatePrice(power: number, price: number) {
        totalPrice = power * loadingTime * price
    }

    $: if (deviceId) getPower(deviceId)
    $: {
        let currentHour = new Date().getHours() + 1
        price = getPriceByHour(currentHour, priceDataForCountry)
        calculatePrice(powerKW, price)
    }
</script>

<div class="calculator-container">
    <div>
        <DeviceSelector bind:deviceId/>
    </div>
    <div>
        <UserInput bind:value={powerKW} unit={t.units.watt}/>
    </div>
    <div>
        <CalculatedOutput {deviceId} {powerKW} {totalPrice}/>
    </div>
</div>

<style>
    .calculator-container{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
</style>