<script lang="ts">
    import Bar from "./Bar.svelte";
    import Line from "./Line.svelte";
    import Hours from "./Hours.svelte"; // Import the new Hours component

    interface PricePair {
        timestamp: number
        price: number
    }

    export let priceDataForCountry: PricePair[]

    //TODO: explore if await is applicable.
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

        <div class="bars-and-hours">
            <div class="bars-area">
                {#each priceDataForCountry as pair}
                    <Bar price={pair.price / maxValue} hoverPrice={pair.price} timestamp={pair.timestamp} />
                {/each}
            </div>
            <Hours/>
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

    /* Flex container for bars and hour labels */
    .bars-and-hours {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    /* Bars area */
    .bars-area {
        display: flex;
        flex: 1;
        gap: 0.3em;
        justify-content: space-between;
    }
</style>