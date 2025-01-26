require('dotenv').config();

const utils = require('./utils');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// frontends install
const frontendsDir = path.join(__dirname, 'frontends');
if (fs.existsSync(frontendsDir)) app.use('/frontends', express.static(frontendsDir));

// routes install
const apiRoutes = require('./endpoints/index');
app.use('/api', apiRoutes);

// initialisation
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} \n http://localhost:${PORT}/api/v1/ \n http://localhost:${PORT}/frontends/`);
});