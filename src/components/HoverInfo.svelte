
<script lang="ts">
    export let price: number;
    export let x: number = 0;
    export let y: number = 0;
</script>

<div class="hover-info" style="top: {y}px; left: {x}px;">
    {price.toFixed(2)}€ cent per kWh
</div>

<style>
    .hover-info {
        position: fixed;
        padding: 0.3em 0.6em;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 12px;
        border-radius: 4px;
        pointer-events: none;
        white-space: nowrap;
        z-index: 10;
    }
</style>

