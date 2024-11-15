<script lang="ts">
    import DeviceSelector from "./DeviceSelector.svelte"
    import CalculatedOutput from "./CalculatedOutput.svelte"
    import devices from "./devices.json"
    import type {PricePair} from "../../utilities/apiClient";
    import {getPriceByHour} from "../../utilities/dataMapper";

    let deviceId: string
    let power: number
    let totalPrice: number
    let loadingTime: number = 1
    let price: number
    export let priceDataForCountry: PricePair[]

    type Device = {
        watts: number
    }

    function getPower(deviceId: string) {
        const device = Object(devices)[deviceId] as Device
        power = device.watts /1000
    }

    function calculatePrice (power: number, price: number){
        totalPrice = power * loadingTime * price
    }

    $: if (deviceId) {
        getPower(deviceId)

        let currentHour: number = new Date().getHours() + 1
        price = getPriceByHour(currentHour ,priceDataForCountry)
        calculatePrice(power, price)

    }
</script>

<div>
    <DeviceSelector bind:deviceId/>
</div>
<div>
    <CalculatedOutput {deviceId} {power} {totalPrice}/>
</div>

<style>

</style>