<script lang="ts">
    export let action: (index: number) => void;
    export let index: number;
</script>

<div class="text-center mb-7">
    <button
        class="bg-red-400 hover:bg-red-300 shadow shadow-sm shadow-gray-300 text-white rounded-lg p-2 text-sm w-24"
        on:click={() => action(index)}
    >
        削除
    </button>
</div>
