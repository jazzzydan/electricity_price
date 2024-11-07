<script lang="ts">
    import HoverInfo from "./HoverInfo.svelte";

    export let price: number;
    export let timestamp: number;

    let showTooltip = false;
    let mouseX = 0;
    let mouseY = 0;

    function handleMouseEnter(event: MouseEvent) {
        showTooltip = true;
        updateTooltipPosition(event);
        console.log("Mouse entered bar:", { price, timestamp });
    }

    function handleMouseMove(event: MouseEvent) {
        updateTooltipPosition(event);
    }

    function handleMouseLeave() {
        showTooltip = false;
        console.log("Mouse left bar:", { price, timestamp });
    }

    function updateTooltipPosition(event: MouseEvent) {
        mouseX = event.clientX + 10; // Offset to position tooltip slightly right of cursor
        mouseY = event.clientY + 10; // Offset to position tooltip slightly below cursor
        console.log("Tooltip position updated:", { mouseX, mouseY });
    }
</script>

<div class="bar" style="transform: scaleY({price});"></div>



<style>
    .bar {
        flex: 1;
        background-color: royalblue;
        height: 100%;
        transform-origin: bottom;
        transition: transform 2s ease-in-out;
    }
    .bar-timestamp-label {
        text-align: center;
        color: royalblue;
        font-size: 10px;
        position: absolute;
        bottom: -1.5em;
        left: 50%;
        transform: translateX(-50%);
    }
</style>