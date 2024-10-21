import cors from "cors";

const ORIGINS = [
  "http://localhost:5173",
  "https://localhost:5173",
  "http://rhino-labs.com",
  "https://rhino-labs.com",
];

export const corsMiddleware = ({ acceptedOrigins = ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  });
