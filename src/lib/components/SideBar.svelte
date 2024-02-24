<script>
    import { isMenuOpen } from "$lib/stores/menuStore";
    import { slide } from "svelte/transition";

    let slideParams = { duration: 400 };
    let desktopSlideOutParams = { duration: 0 };
    $: isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
</script>

{#if $isMenuOpen}
    <nav
        in:slide={slideParams}
        out:slide={isMobile ? slideParams : desktopSlideOutParams}
        class="w-full border-b-2 boder-gray-500 shadow-sm sm:border-r p-3 col-span-4 sm:col-span-1 md:col-span-1"
    >
        <a
            href="/"
            class="text-gray-700 hover:bg-red-400 hover:text-white block hover:rounded-md px-3 py-1 text-base font-medium"
            >ホーム</a
        >
        <hr class="border-b-2 border-red-200 my-1" />
        <a
            href="nenga-hagaki"
            class="text-gray-700 hover:bg-red-400 hover:text-white block rounded-md px-3 py-1 text-base font-medium"
            >年賀はがき</a
        >
        <a
            href="kansei-hagaki"
            class="text-gray-700 hover:bg-red-400 hover:text-white block rounded-md px-3 py-1 text-base font-medium"
            >官製はがき</a
        >

        <a
            href="haraikomi-toriatsukai-hyo"
            class="text-gray-700 hover:bg-red-400 hover:text-white block rounded-md px-3 py-1 text-base font-medium"
            >払込取扱票</a
        >
        <a
            href="haraikomi-toriatsukai-hyo-pub"
            class="text-gray-700 hover:bg-red-400 hover:text-white block rounded-md px-3 py-1 text-base font-medium"
            >払込取扱票 [公]</a
        >
    </nav>
{/if}
