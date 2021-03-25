const async = require("async");
const config = require("./config");
var http = require('http');
const axios = require('axios')

const time = config.TimeDisappearAcs;
const car_id = config.CarID;
const dds_topic = config.KafkaDdsTopic;
const acd_topic = config.KafkaAICTopic;
const username_topic = config.KafkaUsernameTopic;
let res_start = ''
let islogin = false
let musicName = "Confident"
module.exports = (
  app,
  client_redis,
  pushDataToKafka,
  setFirstTime,
  getisFirstTime,
  getPos,
  setUsername,
  io,
) => {
  app.get("/map", function (req, res) {
    console.log(getisFirstTime(),"/map")
    if (getisFirstTime()) {
      setFirstTime();
      var options = {
        host : 'localhost',
        port : 8080,
        path : '/api/car/accident', // the rest of the url with parameters if needed
        method : 'GET' // do GET
      };
      var data = '';
      let json
      var request = http.request(options, function (res) {
          res.on('data', function (chunk) {
              data += chunk;
              // console.log("data", data)
          });
          res.on('end', function () {
              json = JSON.parse(data);
              if(!json.success){
                console.log(data.message)
                
              } else{
              if(json.data != []){
                let now = new Date()
                async.map(
                      json.data,
                      function (pos, cb) {
                        //console.log(pos, id);
                        let t = Math.ceil((now - new Date(pos.detail.time))/1000)
                        console.log(t)
                        let value = {
                          "lat": Number(pos.coordinate.lat),
                          "lng": Number(pos.coordinate.lng),
                        };
                        if(t < time && t >0){
                        client_redis.setex(
                          JSON.stringify(value),
                          time-t,
                          "",
                          function (err, reply) {
                            if (err) return cb(err);
                            cb(null, "success 1st map");
                          }
                        );
                        }
                      },
                      function (error, results) {
                        if (error) return console.log(error);
                        console.log(results);
                        // setid(id);
                      }
                      
                    );
              }
            }
          });
      });
      request.on('error', function (e) {
          console.log("error /map",e.message);
      });
      request.end();
      
    }
    client_redis.keys("*", function (err, keys) {
      if (err) return console.log(err);
      if (keys) {
        res.json({ data: keys });
      }
    });
  });

  app.post("/", function (req, res) {
    // do something w/ req.body or req.files
  });
  app.post("/newAccident", function (req, res) {
    if(islogin) {
      pushDataToKafka(acd_topic,{
        condition: 'AIC',
    });
    }
  });
  app.post("/dds", function (req, res) {
    // if(islogin){
      res_start = new Date()
      io.emit('alert_sound',{ data: musicName })
      console.log("DDS_post")
      res.json({successful:true})
    // }
    // else{
    //   console.log("Driver isn't login")
        // res.json({successful:false})
    // }
  });
  app.post("/selectedSong", function (req, res) {
    let name = req.body.musicName 
    musicName = name
    if(music == null || music == ""){
      res.json({successful:false})
    }
    res.json({successful:true})
  });
  app.post("/newDrowsiness", function (req, res) {
    // if(islogin) {
      let d = new Date()
      let response_time1 =  Math.abs(d - res_start)/1000
      res_start = ""
      pushDataToKafka(dds_topic,{
        condition: 'DIC',
        response_time: response_time1,
      });
      res.json({successful:true})
    // }
    // else{
    //   res.json({successful:false})
    // }
  });
  app.get("/position", function (req, res) {
    // do something w/ req.body or req.files
    console.log("get position")
    pos = getPos()
    if(pos["lat"]== undefined ||pos["lat"]== 0 || pos["lng"]== undefined || pos["lng"]== 0){
      res.json({successful:false, data: null})
    }
    res.json({successful:true, data: pos})
  });
  app.post("/login", async (req, res) => {
    let username1 = req.body.username;
    let password1 = req.body.password;
    console.log(username1,password1);
    await axios({
      method: "POST",
      url: "http://127.0.0.1:8080/api/car/login",
      headers: {},
      data: { username: username1, password: password1, car_id: car_id },
    })
      .then((response) => {

        if(response && response.data && response.data.success){
            pushDataToKafka(username_topic,{
                      condition: "set_account",
                      username: username1,
            });
            setUsername(username1)
            islogin = true
            res.json({ islogin: true, username: username1 });
        }
        else{
          console.log(response.data.message)
          res.json({ islogin: false, message: response.data.message });
        }
        
      })
      .catch((err) => {
        console.log("error in request", err.response.data);
        res.json({ islogin: false, message: err.response.data.message });
      });

  });
  app.post("/logout", async (req, res) => {
    console.log(username1,": logout");
    islogin = false
    setUsername("")
    res.json({ islogin: false, message: "logout" })
  });
};
