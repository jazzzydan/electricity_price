<script lang="ts">
    import {t} from "../../i18n";

    export let deviceId: string | undefined = undefined
</script>

<select bind:value={deviceId}>
    {#each Object.entries(t.devices) as [key, value]}
        <option value={key}>{value}</option>
    {/each}
</select>
