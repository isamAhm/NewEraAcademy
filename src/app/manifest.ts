import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'New Era Academy',
        short_name: 'NEA',
        description: 'New Era Academy - Place to Learn and Grow. Dedicated to nurturing young minds and fostering lifelong learning.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0ea5e9',
        icons: [
            {
                src: '/images/icon2.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/icon2.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}