const authSchemas = {
    TokenPayload: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                description: "ID do usuário"
            },
            nome: {
                type: "string",
                description: "Nome de Exibição do usuário"
            },
            email: {
                type: "string",
                description: "Email de Exibição do usuário"
            },
        },
        example: {
            "_id": "661031feb4850e0c367e54ab",
            "nome": "Fernando Jerônimo dos Santos Júnior"
        }
    },
    RespostaLogin: {
        type: "object",
        properties: {
            token: {
                type: "string",
                description: "Token JWT para autenticação",
                example: "EXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENQUEMLEUECORNOEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKENEXEMPLODETOKEN"
            },
            payload: {
                $ref: "#/components/schemas/TokenPayload"
            },
            usuario: {
                $ref: "#/components/schemas/Usuario"
            }
        }
    }
};

export default authSchemas;
