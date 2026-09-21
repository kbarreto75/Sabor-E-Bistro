/**
 * Middleware de validação para os dados de entrada do item de cardápio.
 * Aplica Guard Clauses para rejeitar requisições inválidas antecipadamente (Early Return).
 */
export function validateItem(req, res, next) {
  const { name, price, category } = req.body;

  // Em métodos de criação (POST), todos os campos essenciais são obrigatórios
  const isPost = req.method === "POST";

  if (isPost && (!name || typeof name !== "string" || !name.trim())) {
    return res.status(400).json({ error: "O campo 'name' é obrigatório e deve ser um texto válido." });
  }

  if (isPost && (price === undefined || isNaN(Number(price)) || Number(price) <= 0)) {
    return res.status(400).json({ error: "O campo 'price' é obrigatório e deve ser um número positivo maior que zero." });
  }

  if (isPost && (!category || typeof category !== "string" || !category.trim())) {
    return res.status(400).json({ error: "O campo 'category' é obrigatório e deve ser um texto válido." });
  }

  // Em métodos de atualização parcial (PUT), se o campo foi enviado, valida se o formato é correto
  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return res.status(400).json({ error: "O campo 'name' não pode ser vazio." });
  }

  if (price !== undefined && (isNaN(Number(price)) || Number(price) <= 0)) {
    return res.status(400).json({ error: "O campo 'price' deve ser um número positivo maior que zero." });
  }

  if (category !== undefined && (typeof category !== "string" || !category.trim())) {
    return res.status(400).json({ error: "O campo 'category' não pode ser vazio." });
  }

  next();
}
