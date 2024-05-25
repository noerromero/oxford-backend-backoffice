import express from "express";
import studentRouter from "./apps/routes/student.routes";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Oxford English Academy API");
});

app.use("/api/students", studentRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
