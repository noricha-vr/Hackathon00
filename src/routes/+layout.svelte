<script lang="ts">
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import GoogleAnalytics from "$lib/components/GoogleAnalytics.svelte";
    import MetaTags from "$lib/components/MetaTags.svelte";
    const title = "バーチャルな茨城で茨城ダッシュ！";
    const description =
        "茨城を舞台にしたバーチャルなゲーム体験を提供するこのサイトでは、プレイヤーはバーチャルな茨城で茨城ダッシュを楽しむことができます。青信号になったらすぐにダッシュ！スコアを稼ぎながらステージを進めよう！赤信号でダッシュボタンを押すとゲームオーバーになるので気をつけてね！最高スコアを目指して、茨城ダッシュのスリルを楽しもう！";
    const thumbnail = "/image/thumbnail.png";
</script>

<svelte:head>
    <MetaTags {title} {description} {thumbnail} />
    <GoogleAnalytics />
</svelte:head>

<div class="min-h-screen flex flex-col min-w-screen-xs">
    <nav class="bg-green-800">
        <div class="mx-auto max-w-7xl px-2 py-2 sm:py-3 sm:px-6 lg:px-8">
            <div class="relative flex h-10 items-center justify-between">
                <div
                    class="flex flex-1 items-center justify-center sm:items-stretch"
                >
                    <a href="/">
                        <div class="flex flex-shrink-0 items-center">
                            <div class="text-white ml-3 text-3xl font-bold">
                                バーチャルな茨城で茨城ダッシュ！
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow">
        <slot />
    </main>
    <Footer />
</div>
