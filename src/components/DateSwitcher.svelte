    <script lang="ts">
        import { onMount } from 'svelte'

        export let onDateChange: (startDate: Date, endDate: Date) => void
        let startDate: Date
        let endDate: Date

        onMount(() => {
            setInitialDates()
            onDateChange(startDate, endDate);

         })

        function setInitialDates() {
            const today = new Date()
            const yesterday = new Date(today)
            yesterday.setDate(today.getDate() - 1)
            yesterday.setHours(23, 0, 0, 0) //yesterday at 23:00 CET = 01:00 EET (winter time)
            startDate = yesterday

            endDate = new Date(today)
            endDate.setHours(22, 59, 59, 999) // 22:00 CET = 24:00 EET (winter time)
        }

        function changeDates(days: number) {
            startDate = new Date(startDate) // Create new Date instances to trigger reactivity
            endDate = new Date(endDate) // Create new Date instances to trigger reactivity

        startDate.setDate(startDate.getDate() + days);
        endDate.setDate(endDate.getDate() + days);

        onDateChange(startDate, endDate);
    }

        function formatDate(date: Date): string {
            return new Intl.DateTimeFormat('en-GB').format(date)
        }
    </script>

    <div>
        <h2>Select Dates</h2>
        <button on:click={() => changeDates(-1)}>Previous Day</button>
        <span>{ formatDate(endDate) }</span>
        <button on:click={() => changeDates(1)}>Next Day</button>
    </div>