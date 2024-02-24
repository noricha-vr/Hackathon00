<script>
    import "../../app.css";
    import { browser } from "$app/environment";

    let showCookieConsent = false;
    if (browser) {
        const allowCookieConsent = localStorage.getItem("allowCookieConsent");
        if (allowCookieConsent === "false" || !allowCookieConsent) {
            showCookieConsent = true;
        }
    }
    function handleCookieConsent(consent) {
        localStorage.setItem("allowCookieConsent", consent.toString());
        showCookieConsent = false;
    }
</script>

{#if showCookieConsent}
    <div class="fixed bottom-0 w-full bg-orange-900 text-white p-1 text-center">
        このウェブサイトはCookieを利用しています。
        <a href="/privacy" class="underline">Cookieの利用について</a>
        許可しますか？
        <button
            on:click={() => {
                handleCookieConsent(true);
            }}
            class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            はい
        </button>
        <button
            on:click={() => {
                handleCookieConsent(false);
            }}
            class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-2"
        >
            いいえ
        </button>
    </div>
{/if}
