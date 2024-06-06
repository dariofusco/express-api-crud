const express = require("express");
const app = express();

const { PORT } = process.env;
const port = PORT || 3000;

require("dotenv").config();

const postsRouter = require("./routers/posts.js");


app.use(express.json());

app.use('/posts', postsRouter);


app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});