const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy para a URL do stream
app.use('/api', createProxyMiddleware({
    target: 'https://list.iptvcat.com', // O domínio de destino
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/my_list/s/fc5b7347289d1070cf0ebe886672a2a4.m3u8', // Reescreve o caminho
    },
    onProxyReq: (proxyReq, req, res) => {
        // Pode adicionar cabeçalhos adicionais aqui, se necessário
        // proxyReq.setHeader('Authorization', 'Bearer <token>');
    }
}));

app.listen(5000, () => {
    console.log('Proxy server running on http://localhost:5000');
});
