// ⚠️ DEPRECATED: Use o servidor Express no Render em vez disso
// Este arquivo está mantido por compatibilidade apenas

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  
  res.status(501).json({
    success: false,
    error: 'Esta função serverless foi desativada. Use o servidor Render em http://seu-render-url.onrender.com/api/contact',
  });
}
