<script lang="ts">
    import {t} from "../../i18n";

    export let totalPrice: number
</script>

<div>
    <span>
        {t.priceForUsage}
        {(totalPrice || 0).toFixed(2)}{t.units.eur}
    </span>
</div>

<style>
    span{
        align-items: center;
        height: 35px;
        font-family: Helvetica, serif;
        font-weight: bold;
        font-size: 16px;
        padding: 0 12px;
    }
</style>