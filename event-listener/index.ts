import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import eventEmitter from "./events";
import { getEventNameFromHash } from "./utils";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const MONGO_URI: string = process.env.MONGO_URI || "";
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", () => {
    console.log("Error connecting to database");
});
mongoose.connection.on("open", () => {
    console.log("Connected to database");
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json("DSM Event Listener");
});

app.post("/", (req: Request, res: Response) => {
    try {
        console.log(1);
        if (!req.body) return res.json({ success: false });
        for (const log of req.body.logs) {
            const topic0: string = log.topic0;
            const eventName: string = getEventNameFromHash(topic0);
            console.log(`Parsing event - ${eventName}`);
            eventEmitter.emit(eventName, req.body);
        }
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
