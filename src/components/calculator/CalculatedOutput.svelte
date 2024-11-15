<script lang="ts">
    import {t} from "../../i18n";

    export let deviceId: string
    export let powerKW: number
    export let totalPrice: number
</script>

<div>
    <span>
        {Object(t.devices)[deviceId]}:
        ({powerKW}{t.units.kWh}) /
        {(totalPrice || 0).toFixed(2)}{t.units.eur}
    </span>
</div>

<style>
    span{
        height: 35px;
        font-family: Helvetica, serif;
        font-weight: bold;
        font-size: 16px;
        padding: 0 12px;
    }
</style>