import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import alunosRoutes from "./src/routes/alunosRoutes.js";
import relatosRoutes from "./src/routes/relatosRoutes.js";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";
import prisma from "./src/config/prisma.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    mensagem: "API do Arquivo Sombrio funcionando!",
    projeto: "Biblioteca de casos"
  });
});

app.use("/alunos", alunosRoutes);
app.use("/relatos", relatosRoutes);
app.use("/usuarios", usuariosRoutes);

try {
  await prisma.$connect();

  console.log("Banco de dados conectado!");
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
} catch (error) {
  console.error("Erro ao conectar banco ao banco: ", error.message);

  await prisma.$disconnect();

  process.exitCode = -1;
}
