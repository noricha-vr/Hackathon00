<script>
    import { onMount } from "svelte";
    import { PUBLIC_GOOGLE_ANALYTICS_ID } from "$env/static/public";

    onMount(() => {
        // Google Analyticsのスクリプトを動的に追加
        const scriptUrl = document.createElement("script");
        scriptUrl.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GOOGLE_ANALYTICS_ID}`;
        scriptUrl.async = true;
        document.head.appendChild(scriptUrl);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", PUBLIC_GOOGLE_ANALYTICS_ID);
    });
</script>
