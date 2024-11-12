<script lang="ts">
    import Bar from "./Bar.svelte";
    import Line from "./Line.svelte";
    import Hours from "./Hours.svelte";
    import type {PricePair} from "../utilities/apiClient";

    export let priceDataForCountry: PricePair[]

    //TODO: explore if await is applicable.
    $: maxValue = priceDataForCountry.length > 0 ? Math.max(...priceDataForCountry.map(pair => pair.price)) : 1000
    $: yAxisValues = maxValue ? [maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0] : []
</script>

<div class="main">
    <div class="chart-area">
        <div class="lines">
            {#each yAxisValues as yAxisValue}
                <Line {yAxisValue}/>
            {/each}
        </div>
        <div class="y-axis"></div>
        <div class="bars-area">
            {#each priceDataForCountry as pair}
                <Bar price={pair.price / maxValue} hoverPrice={pair.price} />
            {/each}
        </div>
    </div>

</div>
<div class="main">
    <div class="timestamp-area">
        <div class="y-axis"></div>
        <div class="timestamp">
            <Hours/>
        </div>
    </div>
</div>
<style>
    .main {
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
        /*flex: 1;*/
        width: 6em;
    }

    .bars-area {
        display: flex;
        flex: 8;
        gap: 0.3em;
    }

    .timestamp {
        margin-top: 1em;
        display: flex;
        flex: 8;
        gap: 0.3em;
    }

    .timestamp-area {
        position: relative;
        display: flex;
        width: 80vw;
        min-width: 600px;
        height: 4vh;
    }

</style>