import { createURLSearch } from "./createURLSearch.js";

export const fetchApi = async (route, method, data, ...props) => {
  try {
    let urlApi = process.env.NEXT_PUBLIC_API_URL;
    let dados = null;
    let headers = { "accept": "application/json" };

    if (method === "GET" && data) {
      let urlSearch = createURLSearch(route, data);
      route = urlSearch;
    }

    if (method !== "GET" && data) {
      if (data instanceof FormData) {
        headers["accept"] = "multipart/form-data";
        dados = data;
      } else {
        headers["Content-Type"] = "application/json";
        dados = JSON.stringify(data);
      }
    }

    const response = await fetch(`${urlApi}${route}`, {
      method: method,
      headers: headers,
      body: dados,
      cache: "no-store",
      ...props,
    });

    if (!response.ok) {
      const errorData = await response.json();

      return {
        data: [],
        error: true,
        errors: Array.isArray(errorData.errors)
          ? errorData.errors.map((err) => ({
              field: err.field || null,
              message: err.errors ? err.errors.join(", ") : err.message || "Erro inesperado",
            }))
          : [{ message: errorData.message || "Erro inesperado na requisição" }],
      };
    }

    const responseData = await response.json();

    if (responseData) {
      return {
        data: responseData?.data || responseData,
        error: false,
        errors: [],
      };
    } else {
      return {
        data: [],
        error: true,
        errors: [{ message: "Nenhum produto encontrado" }],
      };
    }
  } catch (error) {
    console.error("Erro na requisição", error);
    return {
      data: [],
      error: true,
      errors: [{ message: error?.message ?? "Erro inesperado" }],
    };
  }
};
