const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './conifg.env' });

const port = process.env.PORT || 3000;
app.listen(port, () => {});
