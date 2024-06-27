const express = require('express');
require('dotenv').config();
console.log(process.env.USER_NAME); 
console.log(process.env.USER_PASSWORD); 

const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

const app = express();


app.use(express.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contactme', (req, res) => {
    res.render('contactMe');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/reviews', async (req, res) => {
    try {
        const reviews = await readReviews();
        res.render('reviews', { reviews });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.USER_NAME && password === process.env.USER_PASSWORD) {
        res.redirect('/');
    } else {
        res.send('Ошибка регистрации. Неверные данные.');
    }
});

app.post('/add-review', (req, res) => {
    const newReview = {
        username: req.body.username,
        review: req.body.review,
        date: new Date().toISOString()
    };


    fs.readFile('reviews.xml', (err, data) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
        
            if (!result.reviews) {
                result.reviews = { review: [] };
            } else if (!result.reviews.review) {
                result.reviews.review = [];
            }
        
            result.reviews.review.push(newReview);
            const xml = builder.buildObject(result);
            fs.writeFile('reviews.xml', xml, (err) => {
                if (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
                res.redirect('/reviews');
            });
        });
    });
});

function readReviews() {
    return new Promise((resolve, reject) => {
        fs.readFile('reviews.xml', (err, data) => {
            if (err) {
                reject(err);
            } else {
                parser.parseString(data, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.reviews.review);
                    }
                });
            }
        });
    });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});
