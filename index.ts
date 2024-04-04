import { StudentCreator } from "./src/Student/Application/StudentFileCreator";
import { DynamoStudentRepository } from "./src/Student/Infrastructure/Persistence/DynamoDB/DynamoStudentRepository";

import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  res.send("pong pung");
  const studentRepository = new DynamoStudentRepository();
  const studentCreator = new StudentCreator(studentRepository);
  studentCreator.run("12345678A", "John", "Doe", "Smith");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
