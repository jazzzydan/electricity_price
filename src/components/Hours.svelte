<script lang="ts">
    export let hour: number
    export let totalHours: number
    let windowWidth = window.innerWidth

    const shouldShowLabel = (index: number, totalHours: number): boolean => {
        if (windowWidth > 600) return true
        return index % Math.max(1, Math.floor(totalHours / (windowWidth / 100))) === 0;
    }
</script>

<div class="hour-labels">
    {#if shouldShowLabel(hour, totalHours)}
        <div class="hour-label" style="flex: 1; text-align: center;">
            {hour}:00
        </div>
    {/if}
</div>

<style>
    .hour-labels {
        display: flex;
        justify-content: space-between;
        font-family: Helvetica, serif;
        font-size: 14px;
        width: 100%;
        flex-wrap: wrap;
    }
    .hour-label {
        text-align: center;
        white-space: nowrap;
    }
</style>