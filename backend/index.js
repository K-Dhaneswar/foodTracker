import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import morgan from "morgan";
const parentDir=dirname(dirname(fileURLToPath(import.meta.url)));

const app = express();
const port=3000;

app.use(morgan("tiny"));
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(parentDir + "/frontend/foodTracker.html");
});

app.post("/submit",(req,res) => {
    console.log(req.body);
    res.redirect("/");
});

app.listen(port,() =>{
    console.log(`server running in the port ${port}.`)
})