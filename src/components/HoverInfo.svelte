<script lang="ts">
    import {t} from "../i18n";

    export let price: number;
    export let x = 0;
    export let y = 0;
</script>

<div class="hover-info" style="top: {y}px; left: {x}px;">
    {price.toFixed(2)} {t.units.cents}/{t.units.kWh}
</div>

<style>
    .hover-info {
        position: fixed;
        padding: 0.3em 0.6em;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 18px;
        border-radius: 4px;
        pointer-events: none;
        white-space: nowrap;
        z-index: 10;
    }
</style>

