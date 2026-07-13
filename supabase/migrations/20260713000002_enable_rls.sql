-- Activar RLS na tabela
ALTER TABLE quiz_respostas ENABLE ROW LEVEL SECURITY;

-- Permitir apenas INSERT para usuarios anonimos
CREATE POLICY "anon_insert" ON quiz_respostas
  FOR INSERT TO anon
  WITH CHECK (true);

-- Bloquear SELECT para anonimos
CREATE POLICY "anon_select_deny" ON quiz_respostas
  FOR SELECT TO anon
  USING (false);

-- Bloquear UPDATE para anonimos
CREATE POLICY "anon_update_deny" ON quiz_respostas
  FOR UPDATE TO anon
  USING (false);

-- Bloquear DELETE para anonimos
CREATE POLICY "anon_delete_deny" ON quiz_respostas
  FOR DELETE TO anon
  USING (false);
