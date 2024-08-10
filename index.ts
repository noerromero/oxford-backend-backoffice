import express from "express";
import studentRouter from "./apps/routes/student.routes";
import cors, { CorsOptions } from "cors";

const app = express();

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());

const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Oxford English Academy API");
});

app.use("/api/students", studentRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
