<script lang="ts">
    import {availableDate, checkAvailableDate, type ISODate, today} from "../utilities/dates";
    import { toISODate } from "../utilities/dates.js";

    export let date: ISODate = today;

    function changeDate(days: number) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        date = toISODate(d);
    }

</script>

<style>
    input[type="date"] {
        height: 35px;
        border-radius: 6px;
        font-family: Helvetica,serif;
        font-weight: bold;
        font-size: 16px;
        padding: 0 12px;
    }
    button {
        margin: 0 8px;
    }

</style>

<div>
    <button on:click={() => changeDate(-1)}>Previous Day</button>
    <input type="date" bind:value={date} max={availableDate}>
    {#if checkAvailableDate(date)}
        <button on:click={() => changeDate(1)}>Next Day</button>
    {:else}
        <button disabled>Next Day</button>
    {/if}
</div>
