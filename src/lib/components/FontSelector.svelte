<script lang="ts">
    import { styleStore } from "$lib/stores/styleStore";
    export let styles = [];
    let selectedFontClass = $styleStore.fontClass;

    function updateStyleStore() {
        // console.log(`selectedFontClass: ${selectedFontClass}`);
        // console.log(`styles:${JSON.stringify(styles)}`);
        const style = styles.find((s) => s.fontClass == selectedFontClass);
        // console.log(`style: ${JSON.stringify(style)}`);
        styleStore.set(style);
    }
    updateStyleStore();
</script>

<div class="flex justify-center">
    <!-- {$styleStore.yourPostCodeLetterSpacing}
    {$styleStore.myPostCodeLetterSpacing} -->
    <label for="font" class="block">フォント：</label>
    <select bind:value={selectedFontClass} on:change={updateStyleStore}>
        {#each styles as font}
            <option value={font.fontClass}>{font.name}</option>
        {/each}
    </select>
</div>
