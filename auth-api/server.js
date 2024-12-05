import app from "./src/app.js"; 
import swaggerUI from "swagger-ui-express"; 
import swaggerJsDoc from "swagger-jsdoc"; 
import getSwaggerOptions from "./src/docs/config/head.js"; 

const port = process.env.PORT || 3010;

// Configuração do Swagger
const swaggerOptions = getSwaggerOptions(); 
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerOptions)));

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
