CREATE TABLE quiz_respostas (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  desafio TEXT NOT NULL,
  tempo_vendas TEXT NOT NULL,
  area TEXT NOT NULL,
  motivacao TEXT NOT NULL,
  cargo TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
