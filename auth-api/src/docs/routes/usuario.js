import messages from "../../utils/mensagens.js";

const usuarioPaths = {
    "/auth/profile/{id}": {
        get: {
            tags: ["Usuarios"],
            summary: "Retorna um usuário",
            description: `Retorna um usuário da API Auth baseado no ID informado<br>
            `,
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "ID do usuário",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Resposta usuário",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        $ref: "#/components/schemas/Usuario"
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
    },
    "/auth/profile": {
        get: {
            tags: ["Usuarios"],
            summary: "Retorna uma lista de usuários baseado na pesquisa.",
            description: `
                Retorna a lista de usuários da API Auth de acordo com os filtros.
            `,
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    in: "query",
                    name: "nome",
                    description: "Procura por usuário com nome que atende aos termos pesquisados",
                    required: false,
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "email",
                    description: "Procura por usuário com email que começar com o termo pesquisado",
                    required: false,
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "cpf",
                    description: "Procura por usuário com CPF que atende aos termos pesquisados",
                    required: false,
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "pagina",
                    description: "Pagina",
                    required: false,
                    schema: {
                        type: "integer"
                    }
                },
                {
                    name: "limite",
                    in: "query",
                    description: "Informar o máixmo que será listado por página",
                    required: false,
                    schema: {
                        type: "integer"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Lista de usuários",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/Usuario"
                                        }
                                    },
                                    resultados: {
                                        type: "integer",
                                        example: "1"
                                    },
                                    limite: {
                                        type: "integer",
                                        example: "16"
                                    },
                                    pagina: {
                                        type: "integer",
                                        example: "1"
                                    },
                                    totalPaginas: {
                                        type: "integer",
                                        example: "1"
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
        },
    },
    "/auth/alter/{id}": {
        patch: {
            tags: ["Usuarios"],
            summary: "Atualiza o seu próprio usuário",
            description: `
                Atualiza o seu próprio usuário na API Auth<br>
            `,
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "ID do usuário",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UsuarioPATCH"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Usuário atualizado com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        $ref: "#/components/schemas/Usuario"
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
    },
    "/auth/register": {
        post: {
            tags: ["Usuarios"],
            summary: "Criar Usuário",
            description: "Cria um novo usuário",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UsuarioPOST"
                  }
                }
              }
            },
            responses: {
                200: {
                    description: "Usuário atualizado com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    data: {
                                        $ref: "#/components/schemas/Usuario"
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
          },
      
    }
};

export default usuarioPaths;
