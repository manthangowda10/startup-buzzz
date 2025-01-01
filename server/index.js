const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/user',require('./user/userRoutes'));
app.use('/admin',require('./admin/adminRoutes'));

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
})
console.log(require('./user/userRoutes'));