<script lang="ts">
    import {t} from "../../i18n";

    export let deviceId: string | undefined = undefined
</script>

<select bind:value={deviceId}>
    {#each Object.entries(t.devices) as [key, value]}
        <option value={key}>{value}</option>
    {/each}
</select>

<style>
    select{
        height: 35px;
        border-radius: 6px;
        font-family: Helvetica, serif;
        font-weight: bold;
        font-size: 16px;
        padding: 0 12px;
    }
</style>