import messages from "../../utils/mensagens.js";

const authPaths = {
    "/auth/login": {
        post: {
            summary: "Fazer login",
            description: `É necessário fazer login antes de utilizar a maioria das rotas do sistema.<br>
            <b>Credencial de usuários cadastrados para teste:</b>
            <ul>
                <li>Usuário: usuario</li>
            </ul>
            <p>Senha de todos os usuários: Dev@1234</p>
            `,
            tags: ["Autenticacao"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["email", "senha"],
                            properties: {
                                email: {
                                    type: "string",
                                    description: "Email do usuário",
                                    example: "usuario@gmail.com"
                                },
                                senha: {
                                    type: "string",
                                    description: "Senha do usuário",
                                    example: "Dev@1234"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Autenticado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        $ref: "#/components/schemas/RespostaLogin"
                                    },
                                    error: {
                                        type: "boolean",
                                        example: "false"
                                    },
                                    code: {
                                        type: "integer",
                                        example: "200"
                                    },
                                    message: {
                                        type: "string",
                                        example: messages.httpCodes[200]
                                    },
                                    errors: {
                                        type: "array",
                                        example: "[]"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default authPaths;
