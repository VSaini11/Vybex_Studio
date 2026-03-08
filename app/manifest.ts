import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vybex Studio',
    short_name: 'Vybex',
    description: 'Vybex Studio specializes in building high-performance websites, AI-driven applications, and scalable digital products.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#4ade80',
    icons: [
      {
        src: '/Vybex.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
