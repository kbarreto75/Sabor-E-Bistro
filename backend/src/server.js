import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de Middlewares Globais
app.use(cors());
app.use(express.json());

// Endpoint de verificação de saúde da API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API de Gerenciamento de Cardápio - Online",
    endpoints: {
      menu: "/api/menu"
    },
    version: "1.0.0"
  });
});

// Acoplamento das Rotas de Domínio
app.use("/api/menu", menuRoutes);

// Tratamento para rotas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({ error: `Rota '${req.originalUrl}' não encontrada neste servidor.` });
});

// Tratamento de erros inesperados (500)
app.use((err, req, res, _next) => {
  console.error("Erro interno no servidor:", err);
  res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando com sucesso em http://localhost:${PORT}`);
});
