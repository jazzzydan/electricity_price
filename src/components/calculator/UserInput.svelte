<script lang="ts">
    export let value: number
    export let unit: string
</script>

<input type="number" step="1" bind:value/>
{unit}

<style>
    input {
        height: 35px;
        border-radius: 6px;
        font-weight: bold;
        font-size: 16px;
        padding: 0 12px;
    }
</style>