const express = require("express");
const bodyParser = require('body-parser')
const https = require("https");



const app = express();
app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs');



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/weather", (req, res) => {
    const c = req.body.city
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + c + "&appid=6a135f9fc60184b50620f5be54d585b4"
    console.log(url)


    https.get(url, (respose) => {

        if (respose.statusCode == 200) {
            respose.on("data", (data) => {

                const tem = JSON.parse(data);
                const temprature = tem.main.temp;
                const main = tem.weather[0].main
                const icon = tem.weather[0].icon
                const wind = tem.wind.speed
                const h = tem.main.humidity;

                function Currnet_Date() {
                    var time = new Date();
                    var ampm = time.getHours() >= 12 ? ' PM' : ' AM';
                    hours = time.getHours() % 12;
                    hours = hours ? hours : 12;
                    var x1 = time.getMonth() + 1 + "/" + time.getDate() + "/" + time.getFullYear();
                    x1 = x1 + " - " + hours + ":" + time.getMinutes() + ":" + time.getSeconds() + "" + ampm;
                    document.querySelector(".data").innerHTML = x1;
                    setTimeout(Currnet_Date, 1000);

                }

                const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                console.log(h)

                res.render('weather', {
                    h: h,
                    wind: wind,
                    temp: temprature,
                    c: c,
                    img: imgurl,
                    main: main
                })


            })

        } else {
            res.sendFile(__dirname + "/index.html")

        }
    })
})




app.listen(3000, () => {
    console.log("app work now in 3000")
})