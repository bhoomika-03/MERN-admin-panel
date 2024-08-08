const express = require('express');
require('./DB/config');
const users = require('./DB/user');
const products = require('./DB/product')
const cors = require("cors");
const app = express();
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtkey = 'e-comm'
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.post('/signup', async (req, res) => {
    try {
        let user = new users(req.body);
        let result = await user.save();
        result = result.toObject();  //mongoose use to.object library for plain js
        delete result.password; //make sure not to show passowrd
        jwt.sign({ result }, jwtkey, { expiresIn: "5s" }, (err, token) => {
            if (err) {
                res.send({ result: "something went wrong" })
            }
            res.send({ result, auth: token });
        })

        // console.log(result);
    }
    catch (error) {
        console.error("not working");
        res.status(500).send("Internal Server is not working");
    }
});

app.post('/login', async (req, res) => { //users is collection name
    try {
        // console.log(req.body)
        if (req.body.email && req.body.password) {  //necessay condition
            let user = await users.findOne(req.body).select("-password"); //used select so that we can not display the password and users is here collection name
            if (user) {
                jwt.sign({ user }, jwtkey, { expiresIn: "5s" }, (err, token) => {
                    if (err) {
                        res.send({ result: "something went wrong" })
                    }
                    res.send({ user, auth: token });
                })

            }
            else {
                res.send({ result: "no user found" })
            }
        }
        else {
            res.send({ result: "provide full information" });
        }
    }
    catch (error) {
        console.error("Warning:Not Working")
        res.status(500).send("Internal Server is not working");
    }
});

app.post('/add-product', async (req, res) => {
    try {
        console.log(req.body);
        let product = new products(req.body);
        let result = await product.save();
        res.send(result);
    }
    catch (error) {
        console.error("Warning: Not Working");
        res.status(500).send("Internal Server is not working");
    }
});

app.get('/pro-list', async (req, res) => {
    try {
        const list = await products.find();
        if (list.length > 0) {
            res.send(list);
        } else {
            res.send({ result: "invalid information" });
        }
    } catch (error) {
        console.error("warning: Not Working");
        res.status(500).send("Internal Server is not responding");
    }
});

app.delete('/product/:id', async (req, res) => {
    try {
        const result = await products.deleteMany({ _id: req.params.id })
        res.send(result);
    }
    catch (error) {
        console.error("Warning: Not Working");
        res.status(500).send("Internal Server is not working");
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        let result = await products.findOne({ _id: req.params.id });
        if (result) {
            res.send(result)
        } else {
            res.send({ result: "invalid data" });
        }
    } catch (error) {
        console.error("Warning : Not Working")
        res.status(500).send("Internal Server is not working");
    }
});

app.put('/product/:id', async (req, res) => {
    try {
        let result = await products.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        )
        res.send(result);
    } catch (error) {
        console.error("Warning : Not Working");
        res.status(500).send("Internal Server is not working");
    }
});

app.get('/search/:key',  async (req, res) => {
    try {
        let result = await products.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
                { company: { $regex: req.params.key } }
            ],
        });
        res.send(result);
        // console.warn(result)
    } catch (error) {
        console.error("Warning : Not Working");
        res.status(500).send("Internal Server is not working");
    }
});


app.listen(5000, () => {
    console.log("Server is running on PORT: 5000");
});
