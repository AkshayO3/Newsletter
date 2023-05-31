const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https")
const app=express();
app.use(express.static('public'));// To render the locally stored files
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function (req,res) {
    const fName = req.body.fname;
    const lName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    const datat = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/48c2f40881"
    const options = {
        method: "POST",
        auth: "akshay:"

    }
    const request = https.request(url, options, function (response) {
        const code=response.statusCode;
        if(code===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data", function (data) {
        console.log("User added");
        })
    })
    request.write(datat);
    request.end();
});
app.post("/failure",function (req,res){
    res.redirect("/")
})
app.listen(3000,function() {
    console.log("Server running on port 3000")
})