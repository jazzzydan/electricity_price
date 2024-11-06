<script lang="ts">

    export let price: number
    export let timestamp: number

</script>

<div class="bar" style="transform: scaleY({price});"/>

<style>
    .bar {
        flex: 1;
        background-color: royalblue;
        height: 100%;
        transform-origin: bottom;
        transition: transform 2s ease-in-out;
    }
</style>