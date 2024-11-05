    <script lang="ts">
        import {today} from "./dates";
        import {toISODate} from "./dates";

        export let date = today

        function changeDate(days: number) {
            const d = new Date(date)
            d.setDate(d.getDate() + days)
            date = toISODate(d)
        }
    </script>

    <div>
        <h2>Select Dates</h2>
        <button on:click={() => changeDate(-1)}>Previous Day</button>
        <input type="date" bind:value={date}>
        <button on:click={() => changeDate(1)}>Next Day</button>
    </div>