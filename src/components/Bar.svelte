<script lang="ts">

    export let barData: number

</script>


<div class="bar" style="height: {barData}px;">
    <div class="bar-label">{barData}</div>
</div>

<style>
    .bar {
        background-color: #4caf50;
        /*display: flex;*/
        /*flex-direction: column-reverse;*/
        /*align-items: center;*/
        /*justify-content: flex-end;*/
        width: 1em;
        position: relative;
        margin-top: 2em;
        transition: height 2s ease-in-out;
    }

    .bar-label {
        text-align: center;
        color: #333;
        font-size: 12px;
        /*margin-top: 5px;*/
        position: absolute;
        bottom: 100%; /* Position label above the bar */
        left: 50%;
        transform: translateX(-50%);

    }
</style>
