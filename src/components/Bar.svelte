<script lang="ts">
    import HoverInfo from "./HoverInfo.svelte"
    import {today} from "../utilities/dates"

    export let price: number
    export let hoverPrice: number
    export let hour: number
    let currentHour: number = new Date().getHours();
    export let isToday: boolean

    //TODO: isToday to be passed as prop from Layout based on fetchedData, or alternative solution to be considered

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
        showTooltip = false
    }

    function updateTooltipPosition(event: MouseEvent) {
        mouseX = event.clientX + 10
        mouseY = event.clientY + 10
    }

    function isCurrentHour() {
        return isToday && hour === currentHour
    }
</script>

<div class="bar"
     class:current={isCurrentHour()}
     style="transform: scaleY({price}) scaleX({showTooltip ? 1.1 : 1}); background-color: {showTooltip ? 'darkblue' : 'rgba(65, 105, 225, 0.9)'};"
     role="link"
     tabindex="0"
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
        height: 100%;
        transform-origin: bottom;
        transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

    }

    .current {
        background-color: dodgerblue;
    }
</style>