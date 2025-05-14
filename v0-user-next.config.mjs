/** @type {import('next').NextConfig} */
const userNextConfig = {
  // Desabilita a verificação de integridade do runtime para acelerar o carregamento inicial
  experimental: {
    // Desabilita a verificação de runtime do Next.js
    disableOptimizedLoading: true,
    // Prioriza o carregamento do conteúdo principal
    optimizeCss: false,
    // Desativa a verificação de middleware durante o carregamento inicial
    skipMiddlewareUrlNormalize: true,
    // Desativa a verificação de trailers
    skipTrailingSlashRedirect: true,
  },
  // Configurações para otimizar o carregamento inicial
  poweredByHeader: false,
  // Desativa a compressão para acelerar o carregamento inicial
  compress: false,
  // Desativa a análise de fontes para evitar verificações adicionais
  optimizeFonts: false,
  // Configurações para evitar verificações de segurança da Vercel
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

export default userNextConfig; 