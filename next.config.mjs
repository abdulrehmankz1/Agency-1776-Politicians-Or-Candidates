/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern, far-smaller formats. next/image negotiates AVIF → WebP →
    // original based on Accept headers, so mobile clients get the lightest
    // encoding automatically (the campaign screenshots in /public/work are
    // multi-megabyte PNGs; AVIF/WebP cut them by an order of magnitude).
    formats: ['image/avif', 'image/webp'],
    // Trim the generated srcset to the widths we actually render, so the
    // optimizer isn't producing (and caching) sizes no layout requests.
    deviceSizes: [360, 640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 64, 128, 256, 384],
    minimumCacheTTL: 2678400, // 31 days — the screenshots are static assets.
  },
}

export default nextConfig
