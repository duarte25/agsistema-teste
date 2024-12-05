import logRoutes from "../middlewares/LogRoutesMiddleware.js";
import auth from "./authRouter.js";
import usuarios from "./usuarioRouter.js";

const routes = (app) => {

    if (process.env.DEBUGLOG === "true") {
        app.use(logRoutes);
    }

    app.route("/").get((req, res) => {
        res.status(200).redirect("/docs");
    });

    app.use(
        auth,
        usuarios
    );
};

export default routes;
