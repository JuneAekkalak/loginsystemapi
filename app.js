const express = require('express');
const cors = require('cors');

const { connectToMongoDB } = require("./connectToMongoDB");
(async () => {
    await connectToMongoDB();
})();

const verifyToken = require('./middleware/auth');
const loginRouter = require('./route/login');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', loginRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});