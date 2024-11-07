<script lang="ts">
    import Bar from "./Bar.svelte";
    import Line from "./Line.svelte";

    interface PricePair {
        timestamp: number
        price: number
    }

    export let priceDataForCountry: PricePair[]

    //TODO: explore if await is applicable.
    //TODO: minimum price on Y axis
    $: maxValue = priceDataForCountry.length > 0 ? Math.max(...priceDataForCountry.map(pair => pair.price)) : 1000
    $: yAxisValues = maxValue ? [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0] : []
</script>

<div class="component">
    <div class="chart-area">
        <div class="lines">
            {#each yAxisValues as yAxisValue}
                <Line {yAxisValue}/>
            {/each}
        </div>
        <div class="y-axis"></div>
        <div class="bars-area">
            {#each priceDataForCountry as pair}
                <Bar price={pair.price / maxValue} timestamp={pair.timestamp}/>
            {/each}
        </div>
    </div>
</div>

<style>
    .component {
        display: flex;
        flex-direction: column;
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
        flex: 1;
    }

    .bars-area {
        display: flex;
        flex: 8;
        gap: 0.3em;
    }
</style>