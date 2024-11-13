<script lang="ts">
    import {changeLang, lang, t} from "../i18n";
</script>

<select value={lang} on:change="{(event) => changeLang(event.currentTarget.value)}" class="language-selector">
    {#each Object.entries(t.languages) as [langCode, langName]}
        <option value={langCode}>{langName}</option>
    {/each}
</select>

<style>
    select {
        height: 35px;
        border-radius: 6px;
        font-family: Helvetica, serif;
        font-weight: bold;
        font-size: 16px;
        padding: 0 12px;
    }
</style>