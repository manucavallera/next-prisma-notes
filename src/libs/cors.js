import Cors from "cors";

// Inicializa el middleware CORS
const cors = Cors({
  methods: ["GET", "POST", "HEAD"],
  origin: "https://next-prisma-notes-production.up.railway.app", // Reemplaza con tu dominio permitido
});

// Helper para ejecutar middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
export { runMiddleware };
