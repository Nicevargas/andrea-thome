const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const { nome, email, telefone, desafio, tempo_vendas, area, motivacao, cargo } = req.body;

    if (!nome || !email || !telefone) {
      return res.status(400).json({ erro: 'Nome, email e telefone são obrigatórios' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ erro: 'Erro de configuração do servidor' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from('quiz_respostas').insert({
      nome, email, telefone,
      desafio, tempo_vendas, area, motivacao, cargo
    });

    if (error) {
      console.error('Erro Supabase:', error);
      return res.status(500).json({ erro: 'Erro ao salvar resposta' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};
