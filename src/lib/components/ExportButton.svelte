<script lang="ts">
    import { get } from "svelte/store";
    import { exportToCsv, exportToExcel } from "$lib/utils/exportService";

    export let fileName: string;
    export let store: any;
    export let headers: string[];

    let downloadMessageVisible = false;
    function showDownloadMessage() {
        downloadMessageVisible = true;
        // メッセージを数秒後に非表示にする
        setTimeout(() => {
            downloadMessageVisible = false;
        }, 2000); // 3秒後に非表示
    }

    async function handleCsvFileExport(event: Event) {
        const data = get(store) as any[];
        exportToCsv(headers, data, fileName);
        showDownloadMessage();
    }

    async function handleExcelFileExport(event: Event) {
        const data = get(store) as any[];
        exportToExcel(headers, data, fileName);
        showDownloadMessage();
    }
</script>

<div class="mb-5">
    <h2 class="text-lg font-bold mb-2">データ保存（書き出し）</h2>
    <p>入力した内容を書き出して、お使いのパソコンに保存できます。</p>

    <div class="text-center text-md mt-5">
        {#if downloadMessageVisible}
            <p class="text-center font-bold text-gray-900">
                ファイルをダウンロードしました
            </p>
        {:else}
            <button
                class="px-4 py-1 mb-2 bg-blue-500 text-white rounded rounded-md hover:bg-blue-700"
                on:click={handleExcelFileExport}>Excel形式（Shift-JIS）</button
            >
            <button
                class="px-4 py-1 bg-blue-500 text-white rounded rounded-md hover:bg-blue-700"
                on:click={handleCsvFileExport}>CSV形式（UTF-8）</button
            >
        {/if}
    </div>
</div>
