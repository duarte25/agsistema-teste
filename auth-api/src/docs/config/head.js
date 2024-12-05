import authPaths from "../routes/auth.js";
import usuarioPaths from "../routes/usuario.js";
import authSchemas from "../schemas/authSchema.js";
import usuarioSchemas from "../schemas/usuarioSchema.js";

// para ficar o url certo do swagger sem precisar mudar
const getServersInCorrectOrder = () => {
	const devUrl = {url:process.env.SWAGGER_DEV_URL || "http://localhost:"+process.env.PORT};
	const prodUrl = {url:process.env.SWAGGER_PROD_URL};

	if(process.env.NODE_ENV === "production") return [prodUrl,devUrl];
	else return [devUrl,prodUrl];
};

const getSwaggerOptions = () => {
	return {
		swaggerDefinition: {
			openapi: "3.0.0",
			info: {
				title: "API AUTH",
				version: "1.0-alpha",
				description: "API AUTH\n\nÉ necessário autenticar com token JWT antes de utilizar a maioria das rotas, faça isso na rota /login com um nome de usuario e senha válido",
				contact: {
					name: "Projeto Autenticação",
					email: "duarte.guga2025@gmail.com.br",
				},
			},
			servers: getServersInCorrectOrder(),
			tags: [
                {
                    name: "Autenticacao",
                    description: "Rotas de autenticação"
                },
				{
					name: "Usuarios",
					description: "Usuarios"
				}
			],
			paths: {
				...authPaths,
				...usuarioPaths
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT"
					}
				},
				schemas: {
					...authSchemas,
					...usuarioSchemas
				}
			},
		},
		apis: ["./src/routes/*.js"]
	};
};

export default getSwaggerOptions;
