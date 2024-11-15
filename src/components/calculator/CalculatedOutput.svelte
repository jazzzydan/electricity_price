<script lang="ts">
    import {t} from "../../i18n";

    export let deviceId: string
    export let power: number
    export let totalPrice: number
</script>

<div>
    <span>
        {Object(t.devices)[deviceId]}:
        ({power}{t.units.kWh}) /
        {(totalPrice || 0).toFixed(2)}{t.units.eur}
    </span>
</div>
