<script lang="ts">
    export let yAxisValue: number
</script>

<div class="main">
    <p class="y-axis-value">{yAxisValue.toFixed(0)}</p>
    <div class="dashed-line"></div>
</div>

<style>
    .main {
        display: flex;
        align-items: center;
        gap: 2px;
        height: 0;
    }

    .y-axis-value {
        font-weight: bold;
        color: royalblue;
        font-size: 20px
    }

    .dashed-line {
        flex: 1;
        border-top: 2px dashed royalblue;
    }
</style>