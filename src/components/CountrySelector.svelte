<script lang="ts">
    export let listOfCountries = []
    export let countryCode = ''

</script>

{#each listOfCountries as country}
    <label>
        <input
                type="radio"
                name="countryOption"
                value={country}
                bind:group={countryCode}
        />
        {country.toUpperCase()}
    </label>
{/each}
