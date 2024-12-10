const dotenv = require('dotenv');
const app = require('./app');
const connectToDB = require('./db/connection');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
connectToDB();
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
