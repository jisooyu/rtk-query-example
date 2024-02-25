const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const campRoutes = require('./routes/campRoutes');

app.use(express.json({ extended: false }));

app.use('/', campRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
