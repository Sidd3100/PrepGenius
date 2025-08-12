require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const {protect} = require("./middlewares/authMiddleware");
const {generateInterviewQuestions ,generateConceptExplanation} = require("./controllers/aiController");


const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const questionRoutes = require('./routes/questionRoutes')

const app = express();

app.use(
    cors({
        origin: "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type", "Authorization"],
    })
);

const corsOptions = {
    origin: "https://prepgenius.onrender.com",
    credentials: true
}

app.use(cors(corsOptions));
connectDB();

app.use(express.json()); 

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-interview-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-concept-explanation", protect, generateConceptExplanation);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "frontend/dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist","index.html"));
});

const PORT = process.env.PORT ||  5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));