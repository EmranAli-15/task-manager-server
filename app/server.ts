import { app } from "./index";
import { DBConnection } from "./database/databaseConnection";

const port = 5000;


async function main() {
    try {
        await DBConnection();
        app.listen(port, () => {
            console.log("server is running on port " + port);
        });
    } catch (error) {
        console.log(error)
    }
}

main();