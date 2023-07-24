// Main File
import connect_to_database from "./src/config/db.mjs";
import logger from "./src/config/logger.mjs";
import { PORT } from "./src/keys/keys.mjs";
import server from "./src/routes/app.mjs";

// connect to database
connect_to_database();

// port     
const port = PORT || 3000

// running on port...
server.listen(port, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
})


