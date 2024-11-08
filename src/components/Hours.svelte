<script lang="ts">
    let windowWidth = window.innerWidth;

    const hours = Array.from({ length: 24 }, (_, i) => {
        const hour = (i + 1).toString().padStart(2, '0');
        return `${hour}:00`;
    });

    hours[23] = '00:00';

    const handleResize = () => {
        windowWidth = window.innerWidth;
    };

    import { onMount, onDestroy } from 'svelte';
    onMount(() => {
        window.addEventListener('resize', handleResize);
    });

    onDestroy(() => {
        window.removeEventListener('resize', handleResize);
    });

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
        font-size: 12px;
        width: 100%;
        flex-wrap: wrap;
    }

    .hour-label {
        text-align: center;
        font-weight: bold;
        white-space: nowrap;
    }
</style>
