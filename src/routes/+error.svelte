<script lang="ts">
    import "../app.css";
    import CookieConsent from "$lib/components/CookieConsent.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Sidebar from "$lib/components/SideBar.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";
    let toggleMenuOpen = false;
    function toggleMenu() {
        toggleMenuOpen = !toggleMenuOpen;
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Hina+Mincho&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
    />
    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-VJGZPFFPTV"
    ></script>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
    />

    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-VJGZPFFPTV");
    </script>
</svelte:head>

<div class="min-h-screen flex flex-col min-w-screen-xs">
    <nav class="bg-orange-800">
        <div class="mx-auto max-w-7xl px-2 py-2 sm:py-3 sm:px-6 lg:px-8">
            <div class="relative flex h-10 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center">
                    <MenuButton {toggleMenu} />
                </div>
                <div
                    class="flex flex-1 items-center justify-center sm:items-stretch"
                >
                    <a href="/">
                        <div class="flex flex-shrink-0 items-center">
                            <img
                                class="w-auto"
                                src="/favicon/favicon-42x42.png"
                                alt="Your Company"
                            />
                            <div class="text-white ml-3 text-3xl font-bold">
                                バーチャルな茨城で茨城ダッシュ！
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="grid grid-cols-4 flex-grow">
        <Sidebar {toggleMenuOpen} />

        <main
            class="col-span-4 {toggleMenuOpen
                ? 'sm:col-span-3'
                : 'sm:col-span-4'} "
        >
            <div class="text-center mt-20">
                <p class="font-semibold text-gray-800 text-4xl">404</p>
                <h1
                    class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                >
                    Page not found
                </h1>
                <p class="mt-6 text-base leading-7 text-gray-600">
                    指定されたページは見つかりませんでした
                </p>
                <div class="mt-8 flex items-center justify-center gap-x-6">
                    <a
                        href="/"
                        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >ホームに戻る</a
                    >
                </div>
            </div>
        </main>
    </div>
    <Footer />
</div>

<CookieConsent />
