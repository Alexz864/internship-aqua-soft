import app from "./app";
import db from "./models";

const PORT = process.env.PORT || 3000;

//database connection and server start
const startServer = async () => {
    try {
        //test database connection
        await db.sequelize.authenticate();
        console.log('Database connection established successfully.');

        //sync database
        await db.sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        //start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();