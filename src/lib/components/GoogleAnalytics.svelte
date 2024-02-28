<script lang="ts">
    import { browser } from "$app/environment";
    const id = (): string | undefined => {
        if (browser) {
            return import.meta.env.VITE_PUBLIC_GOOGLE_ANALYTICS_ID;
        }
    };

    // onMount(() => {
    //     const scriptTag = document.createElement("script");
    //     scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GOOGLE_ANALYTICS_ID}`;
    //     scriptTag.async = true;
    //     document.head.appendChild(scriptTag);

    //     window.dataLayer = window.dataLayer || [];
    //     function gtag() {
    //         dataLayer.push(arguments);
    //     }
    //     gtag("js", new Date());

    //     gtag("config", PUBLIC_GOOGLE_ANALYTICS_ID);
    // });
</script>

<svelte:head>
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=${id}"
    ></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", id);
    </script>
</svelte:head>
