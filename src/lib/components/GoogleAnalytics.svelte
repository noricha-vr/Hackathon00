<script>
    import { PUBLIC_GOOGLE_ANALYTICS_ID } from "$env/static/public";
    import { onMount } from "svelte";

    onMount(() => {
        const scriptTag = document.createElement("script");
        scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GOOGLE_ANALYTICS_ID}`;
        scriptTag.async = true;
        document.head.appendChild(scriptTag);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", PUBLIC_GOOGLE_ANALYTICS_ID);
    });
</script>
