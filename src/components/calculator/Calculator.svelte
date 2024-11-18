<script lang="ts">
    import DeviceSelector from "./DeviceSelector.svelte"
    import CalculatedOutput from "./CalculatedOutput.svelte"
    import devices from "./devices.json"
    import type {PricePair} from "../../utilities/apiClient";
    import {getPriceByHour} from "../../utilities/dataMapper";
    import UserInput from "./UserInput.svelte";
    import {t} from "../../i18n";

    let deviceId: DeviceId
    let powerKW: number
    let totalPrice: number
    let startTime: number = new Date().getHours()
    let endTime: number = new Date().getHours() + 1
    let price: number
    export let priceDataForCountry: PricePair[]

    type DeviceId = keyof typeof devices;

    type Device = {
        watts: number
    }

    function calculateDevicePower(deviceId: DeviceId) {
        const device = devices[deviceId] as Device
        powerKW = device.watts / 1000
    }

    function calculatePrice() {
        totalPrice = 0
        for (let i = startTime; i < endTime; i++) {
            price = getPriceByHour(i, priceDataForCountry)
            totalPrice += powerKW * price
        }
    }

    $: if (deviceId) {
        calculateDevicePower(deviceId)
        calculatePrice()
    }
    $: if (startTime | endTime) calculatePrice()
    $: if (priceDataForCountry) calculatePrice()
</script>

<div class="calculator-container">
    <div>
        <DeviceSelector bind:deviceId/>
    </div>
    <div>
        <span> {t.devicePower} </span>
        <UserInput bind:value={powerKW} unit={t.units.kW}/>
    </div>
    <div>
        <span> {t.startTime} </span>
        <UserInput bind:value={startTime} unit=": 00"/>
    </div>
    <div>
        <span> {t.endTime} </span>
        <UserInput bind:value={endTime} unit=": 00"/>
    </div>
    <div>
        <CalculatedOutput {deviceId} {powerKW} {totalPrice}/>
    </div>
</div>

<style>
    .calculator-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
</style>