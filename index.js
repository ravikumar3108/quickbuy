const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()
const mongoose = require('mongoose');
const multer = require('multer');
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


main().catch(err => console.log(err));
async function main() {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
          "Database connected: ",
          connect.connection.host,
          connect.connection.name
        );
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name
    },
});

const upload = multer({ storage: storage });

app.use(express.json())
app.use(cors(corsOptions))
app.use("/users", userRoutes);
app.use("/product", upload.single('image'), productRoutes);


app.get("/", (req, res) => {
    res.json({
        status:200,
        msg:"Active"
    })
})
app.listen(8000, () => {
    console.log("Server is Started");
});


