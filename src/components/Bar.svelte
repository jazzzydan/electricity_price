<script lang="ts">
    import HoverInfo from "./HoverInfo.svelte";

    export let price: number; // The scaled value used for rendering
    export let originalPrice: number; // The actual price to display in the tooltip
    export let timestamp: number;

    let showTooltip = false;
    let mouseX = 0;
    let mouseY = 0;

    function handleMouseEnter(event: MouseEvent) {
        showTooltip = true;
        updateTooltipPosition(event);
    }

    function handleMouseMove(event: MouseEvent) {
        updateTooltipPosition(event);
    }

    function handleMouseLeave() {
        showTooltip = false;
    }

    function updateTooltipPosition(event: MouseEvent) {
        mouseX = event.clientX + 10; // Offset to position tooltip slightly right of cursor
        mouseY = event.clientY + 10; // Offset to position tooltip slightly below cursor
    }
</script>

<div
        class="bar"
        style="transform: scaleY({price});"
on:mouseenter={handleMouseEnter}
on:mousemove={handleMouseMove}
on:mouseleave={handleMouseLeave}
></div>

{#if showTooltip}
    <!-- Pass the original price to HoverInfo -->
    <HoverInfo price={originalPrice} x={mouseX} y={mouseY} />
{/if}

<style>
    .bar {
        flex: 1;
        background-color: royalblue;
        height: 100%;
        transform-origin: bottom;
        transition: transform 2s ease-in-out;
    }
</style>