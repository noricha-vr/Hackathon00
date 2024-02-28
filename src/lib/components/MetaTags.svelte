<script lang="ts">
    import { page } from "$app/stores";
    export let title: string;
    export let description: string;
    export let thumbnail: string;
    const pageUrl = $page.url.pathname;
</script>

<head>
    <title>{title}</title>
    <meta lang="ja" />
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:image" content={thumbnail} />
    <meta property="og:site_name" content="サイト名" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={thumbnail} />
    <link rel="canonical" href={pageUrl} />
</head>
