const express = require('express');
const cors = require('cors'); 
const routes = require('./routes'); 
const app = express();
const PORT = process.env.PORT || 3000;  


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

 