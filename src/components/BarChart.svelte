<script lang="ts">
    import Bar from "./Bar.svelte";

    interface PricePair {
        timestamp: number
        price: number
    }

    export let priceDataForCountry: PricePair[]

</script>

<div class="barchart">
    {#each priceDataForCountry as pair}
        <div class="bar-container">
            <Bar price={pair.price} timestamp={pair.timestamp}/>
        </div>
    {/each}
</div>

<style>
    .barchart {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        justify-content: center;
        align-items: flex-end;
        flex-wrap: wrap;
        min-height: 600px;
        overflow: hidden;
        padding: 2em;
        background-color: rgba(240, 240, 240, 0.5);
    }
    .bar-container {
        display: flex;
        justify-content: center;
        align-items: flex-end;  /* Align bar at the bottom of the container */
    }

</style>