import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/handler/'],
        },
        sitemap: 'https://orbit-rfm-pro.com/sitemap.xml',
    };
}
