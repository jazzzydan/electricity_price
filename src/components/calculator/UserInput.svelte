<script lang="ts">
    export let value: number
    export let unit: string
</script>

<label class="input-container">
    <input type="number" step="1" bind:value min="0"/>
    <span class="unit">{unit}</span>
</label>

<style>
    .input-container {
        display: inline-flex;
        align-items: center;
        position: relative;
    }
    input {
        width: 100px;
        height: 35px;
        border-radius: 6px;
        font-weight: bold;
        font-size: 16px;
        padding: 0 12px;
        text-align: center;
    }
    .unit {
        position: absolute;
        right: 2em;
        color: #555;
        pointer-events: none;
    }
</style>