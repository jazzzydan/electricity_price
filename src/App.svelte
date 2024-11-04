<script lang="ts">
  import DateSwitcher from "./DateSwitcher.svelte";
//todo remove ;
  //TODO: fetcher component. apiUrl creation move to fetcher
  //TODO: chart component that consists of coloumn component

  interface PricePair {
    timestamp: number, price: number
  }

  type CountryCode = 'ee'|'lv'|'lt'|'fi'

  let data: Record<CountryCode, Array<PricePair>> = {}
  let error: string | undefined
  let loading = true
  let apiUrl: string

  async function fetchData() {
    loading = true
    error = null

    if (!apiUrl) return;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      data = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function handleApiUrlChange(newApiUrl: string) {
    apiUrl = newApiUrl;
    fetchData();
  }

</script>

<main>
  <div>
    <DateSwitcher onApiUrlChange={handleApiUrlChange}/>
  </div>
  <div >
    {#if error}
      <p>Error: {error}</p>
    {:else if data}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</main>
