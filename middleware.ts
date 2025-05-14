import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtém o cabeçalho User-Agent para identificar o cliente
  const userAgent = request.headers.get('user-agent') || '';
  
  // Obtém o URL atual
  const url = request.nextUrl.clone();
  
  // Verifica se é uma solicitação da Vercel para verificação
  const isVercelVerification = 
    userAgent.includes('Vercel') || 
    request.headers.get('x-vercel-deployment-url') ||
    request.headers.get('x-vercel-ip');
  
  // Se for uma verificação da Vercel, permita o acesso imediato sem verificações adicionais
  if (isVercelVerification) {
    const response = NextResponse.next();
    
    // Adiciona cabeçalhos para evitar verificações adicionais
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    response.headers.set('X-Middleware-Skip', 'true');
    
    return response;
  }
  
  // Para solicitações normais de usuários, também permita acesso imediato
  const response = NextResponse.next();
  
  // Adiciona cabeçalhos para melhorar a performance e evitar verificações
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Desativa o cache para garantir conteúdo atualizado
  response.headers.set('Cache-Control', 'no-store, must-revalidate');
  
  return response;
}

// Configura o middleware para ser executado em todas as rotas
export const config = {
  matcher: '/((?!api/|_next/|_vercel|[\\w-]+\\.\\w+).*)',
}; 