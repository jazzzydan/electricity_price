<script lang="ts">
    import {t} from "../../i18n";

    export let yAxisValue: number
</script>

<div class="bar-chart">
    <p class="y-axis-value">{yAxisValue.toFixed(0)} {t.units.cents}/{t.units.kWh}</p>
    <div class="dashed-line"></div>
</div>

<style>
    .bar-chart {
        display: flex;
        align-items: center;
        gap: 2px;
        height: 0;
    }

    .y-axis-value {
        font-family: Helvetica, serif;
        font-weight: bold;
        font-size: 16px;
        color: royalblue;
    }

    .dashed-line {
        flex: 1;
        border-top: 2px dashed royalblue;
    }
</style>