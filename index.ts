import express, {Express, Request, Response, Router} from 'express'
import path from 'path'

import LoginRouter from './loginRouter'

const app:Express = express();

app.set('port', process.env.PORT || 8080);
app.set('host',process.env.HOST || "127.0.0.1" )

app.use(express.json())

app.get("/", (req:Request, res:Response) => {
    const filePath = path.join(__dirname, "index.html")
    res.sendFile(filePath)
})

app.use("/login", LoginRouter)


app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running : http://${app.get('host')}:${app.get('port')}`)
})