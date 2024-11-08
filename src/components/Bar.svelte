<script lang="ts">
    import HoverInfo from "./HoverInfo.svelte";

    export let price: number;
    export let hoverPrice: number;
    export let timestamp: number;

    let showTooltip = false;
    let mouseX = 0
    let mouseY = 0

    function handleMouseEnter(event: MouseEvent) {
        showTooltip = true
        updateTooltipPosition(event)
    }

    function handleMouseMove(event: MouseEvent) {
        updateTooltipPosition(event)
    }

    function handleMouseLeave() {
        showTooltip = false;
    }

    function updateTooltipPosition(event: MouseEvent) {
        mouseX = event.clientX + 10
        mouseY = event.clientY + 10
    }
</script>

<div
    class="bar"
    style="
        transform: scaleY({price}) scaleX({showTooltip ? 1.1 : 1});
        background-color: {showTooltip ? 'darkblue' : 'royalblue'};
    "
    on:mouseenter={handleMouseEnter}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
></div>

{#if showTooltip}
    <HoverInfo price={hoverPrice} x={mouseX} y={mouseY}/>
{/if}

<style>
    .bar {
        flex: 1;
        background-color: royalblue;
        height: 100%;
        transform-origin: bottom;
        transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
    }
</style>