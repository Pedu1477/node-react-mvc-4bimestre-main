import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Arquivo Sombrio — Biblioteca de casos",
      version: "1.0.0",
      description:
        "API da biblioteca de relatos criminais, com consulta pública e gerenciamento protegido por token"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o token no formato: Bearer TOKEN_SECRETO"
        }
      }
    }
  },
  apis: ["../../server.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
