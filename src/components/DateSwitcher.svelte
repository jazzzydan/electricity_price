<script lang="ts">
    import {tomorrow, arePricesAvailableFor, type ISODate, today} from "../utilities/dates";
    import {toISODate} from "../utilities/dates.js";

    export let date: ISODate = today;

    function incrementDate(days: number) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        date = toISODate(d);
    }
</script>

<div>
    <button on:click={() => incrementDate(-1)}>Previous Day</button>
    <input type="date" bind:value={date} max={tomorrow}>
    <button disabled={!arePricesAvailableFor(date)} on:click={() => incrementDate(1)}>Next Day</button>
</div>

<style>
    input[type="date"] {
        height: 35px;
        border-radius: 6px;
        font-family: Helvetica, serif;
        font-weight: bold;
        font-size: 16px;
        padding: 0 12px;
    }

    button {
        margin: 0 8px;
    }
</style>
