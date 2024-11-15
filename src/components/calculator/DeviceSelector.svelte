<script lang="ts">
    import {t} from "../../i18n";

    export let deviceId: string | undefined = undefined

</script>

<div>
    <select bind:value="{deviceId}" class="device-selector">
        {#each Object.entries(t.devices) as [key, value]}
            <option value={key}>{value}</option>
        {/each}
    </select>
</div>

<style>

</style>
