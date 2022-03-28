const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const {v4: uuidv4} = require('uuid')
const crypto = require('crypto')
const cors = require('cors')
const app = express()
const client = require('./db.js')
const path = require('path')
PORT = process.env.PORT || 3000
app.use(fileUpload({
    createParentPath: true
}))

app.use(cors({ origin: 'http://localhost:8080'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))




app.post("/upload", async (req, res) => {
    let response = ""
    if (!req.files) {
        res.json({
            message: 'No file uploaded'
        })
    } else {
        await client.connect()
        let file = req.files.file
        file_uri = `${uuidv4()}.${file.name}`
        file.mv(`./uploads/${file_uri}`)

        const db = client.db("upload_db")
        const upload = db.collection("upload")
        const id = crypto.randomBytes(16).toString("hex")
        const fake_file_uri = id
        const document = {
            'original_file_uri': file_uri,
            'fake_file_uri': fake_file_uri,
            'file_upload_date': Date.now()
        }
        const result = await upload.insertOne(document)
        response = `http://localhost:3000/show/${fake_file_uri}`
        console.log(`${fake_file_uri}`)
        await client.close()
        res.json({
            message: fake_file_uri
        })
    }
})

app.get("/show/:fileId", async (req, res) => {
    let { fileId } = req.params
    console.log(fileId)
    if (fileId) {
        await client.connect()
        const db = client.db("upload_db")
        const upload = db.collection("upload")
        const result = await upload.findOne( {"fake_file_uri": fileId} )
        if (result) {
            let { original_file_uri } = result
            res.sendFile(path.join(__dirname, "uploads", original_file_uri))
        }
    }
})
app.listen(PORT, () => console.log(`[SERVER] is listening on port ${PORT}`))