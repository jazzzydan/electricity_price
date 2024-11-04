<script lang="ts">
  import { onMount } from 'svelte';
  import DateSwitcher from "./DateSwitcher.svelte";

  let data = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      data = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

</script>

<main>
  <div>
    <DateSwitcher />
  </div>

  <div >
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p>Error: {error}</p>
    {:else}
      <ul>
        {#each data as item}
          <li>{item.name}</li>
        {/each}
      </ul>
    {/if}
  </div>

</main>
