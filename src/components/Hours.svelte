<script lang="ts">
    export let count: number
    let windowWidth = window.innerWidth;

    //TODO: correct time assigning for switching to summer or winter time

    const hours = Array.from({ length: count }, (_, i) => {
        const hour = (i + 1).toString().padStart(2, '0');
        return `${hour}:00`;
    });
    hours[count - 1] = '00:00';

    const shouldShowLabel = (index: number): boolean => {
        if (windowWidth > 600) return true;
        return index % Math.max(1, Math.floor(hours.length / (windowWidth / 100))) === 0;
    };
</script>

<div class="hour-labels">
    {#each hours as hour, index}
        {#if shouldShowLabel(index)}
            <div class="hour-label" style="flex: 1; text-align: center;">
                {hour}
            </div>
        {/if}
    {/each}
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