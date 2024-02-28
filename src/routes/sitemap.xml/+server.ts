
export async function GET({ fetch, setHeaders }) {
    // ヘッダーを設定
    setHeaders({
        'Content-Type': 'application/xml'
    });
    const baseUrl = 'https://ibarakidash.kojin.works/';

    const urls = [
        'game',
        'privacy',
    ];

    // XML形式のサイトマップを生成
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.8</priority>
    </url>
    ${urls.map(url => `
        <url>
            <loc>${baseUrl + url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <priority>0.8</priority>
        </url>
        `).join('')}
</urlset>`;

    return new Response(sitemap);
}
