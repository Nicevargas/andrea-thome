module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'M\u00e9todo n\u00e3o permitido' });
  }

  try {
    const { nome, email, telefone, desafio, tempo_vendas, area, motivacao, cargo } = req.body;

    if (!nome || !email || !telefone) {
      return res.status(400).json({ erro: 'Nome, email e telefone s\u00e3o obrigat\u00f3rios' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Vari\u00e1veis ausentes:', { url: !!supabaseUrl, key: !!supabaseKey });
      return res.status(500).json({ erro: 'Erro de configura\u00e7\u00e3o do servidor' });
    }

    const response = await fetch(supabaseUrl + '/rest/v1/quiz_respostas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': 'Bearer ' + supabaseKey
      },
      body: JSON.stringify({
        nome, email, telefone,
        desafio, tempo_vendas, area, motivacao, cargo
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Erro Supabase:', response.status, text);
      return res.status(500).json({ erro: 'Erro ao salvar resposta' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Erro interno:', err.message, err.stack);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};
