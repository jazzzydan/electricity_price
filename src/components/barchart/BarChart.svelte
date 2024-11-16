<script lang="ts">
    import Bar from "./Bar.svelte"
    import Line from "./Line.svelte"
    import type {PricePair} from "../../utilities/apiClient"

    export let priceDataForCountry: PricePair[]
    export let isToday: boolean
    $: maxValue = priceDataForCountry.length > 0 ? Math.max(...priceDataForCountry.map(pair => pair.price)) : 1000
    $: yAxisValues = maxValue ? [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0] : []
</script>

<div class="bar-chart">
    <div class="chart-area">
        <div class="lines">
            {#each yAxisValues as yAxisValue}
                <Line {yAxisValue}/>
            {/each}
        </div>
        <div class="y-axis"></div>
        <div class="bars-area">
            {#each priceDataForCountry as pair}
                <Bar price={pair.price / maxValue} hoverPrice={pair.price} hour={pair.timestamp} isToday={isToday}/>
            {/each}
        </div>
    </div>
</div>

<style>
    .bar-chart {
        display: flex;
        flex-direction: row;
    }
    .chart-area {
        position: relative;
        display: flex;
        width: 80vw;
        min-width: 600px;
        height: 60vh;
        min-height: 400px;
    }
    .lines {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .y-axis {
        width: 6em;
    }
    .bars-area {
        display: flex;
        flex: 8;
        gap: 0.3em;
    }
</style>