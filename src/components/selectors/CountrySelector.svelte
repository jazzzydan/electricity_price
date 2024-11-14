<script lang="ts">
    import type {CountryCode} from "../../utilities/apiClient";

    export let listOfCountries : CountryCode[] = []
    export let countryCode: CountryCode

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