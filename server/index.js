// Importing
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require('mysql')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(cors())
app.use(express.json());

let random_number = Math.floor(Math.random() * 899999 + 100000); // The random code
var is_time_over = 0; // flag for checking if the timer is over
var timer_counter = 0; // flag for ending the timer

// Function that chech if the email is valid
function validateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {
      return true;
    } 
    else {
      return false;
    }
  
}

function countFiveMinutes() {
    timer_counter++;
    if(timer_counter == 1) {
        clearInterval(timerID);
        is_time_over = 1;
        console.log("The timer ended");
    }
}

var timerID; // Timer 
var user_index = -1; // The user index in the DB
var user_email; // The user email address
var user_name;

// Sending email API
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } }; 
function sendEmail(name, code) {
    Email.send({
    Host: "smtp.elasticemail.com", 
    Username: "mikeybydun1@gmail.com",
    Password: "D3680809DA035ABCAFE2FBEF018CEC596C07",
    To: name,
    From: "mikeybydun1@gmail.com",
    Subject: `נשלח אליך קוד אימות`,
    Body: ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sunday Confirm Email</title>
    </head>

    <body class="body" style="padding:0; margin:0; display:block; background:#eeebeb; -webkit-text-size-adjust:none;" bgcolor="#eeebeb">
    <table align="center" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" valign="top" style="background-color:#eeebeb" width="100%">
        <center>
        <table cellspacing="0" cellpadding="0" width="600" class="w320">
            <tr>
            <td align="center" valign="top">
            <table cellspacing="0" cellpadding="0" class="force-full-width" style="background-color:#3bcdb0;">
                <tr>
                <td style="background-color:#3bcdb0;">
                    <table cellspacing="0" cellpadding="0" class="force-full-width">
                    <tr>
                        <td style="font-size:40px; font-family: 'assistant'; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                        <div class="mobile-br">&nbsp;</div>
                        נשלח אליך קוד אישור
                        <br/>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:24px; text-align:center; padding: 0 75px; color: #6f6f6f;" class="w320 mobile-spacing">
                        אתה מוזמן לשמור את קוד האימות המצורף ולהעתיק אותו במיקום הרלוונטי
                        </td>
                    </tr>
                    <tr>
                        <td></td><td></td>
                    </tr>
                    <tr>
                        <td style="font-size:40px; font-family: 'assistant'; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                            ${code}
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
        </center>
    
                </td>
                </tr>
            </table>
            </td>
            </tr>
        </table>
        </center>
        </td>
    </tr>
    </table>
    </body>
    </html>
    `,
})}

// connecting to the MySql DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mikey',
    database: 'usersemails'
});

app.post('/submitemail', (req,res) => {

    random_number = Math.floor(Math.random() * 899999 + 100000); // random a code number (6 digits)
    const email = req.body.email; // The input email
    user_email = email; // Store the email in a global var
    console.log("The user submited the email:",email);

    // Select all emails from the DB
    const sqlSelect = "SELECT email FROM usersemails.users;";
    let flag = "notUser";

    // Query for selecting all the emails from the sql and check
    // if the inputt mail is there
    db.query(sqlSelect, (err, result) => {
        var emails_size = Object.keys(result).length;
        for(let i = 0; i < emails_size; i++) {
            if(result[i].email == email) {
                flag = "user";
                user_index = i+1;
            }
        }

        // The email is not in the DB
        if(flag == "notUser") {
            console.log("The user is not in the DB")
            console.log()
            res.status(200).send(flag);
            return;
        }

        // Checking if the email is valid
        if(validateEmail(email) == false) {
            flag = "not valid";
            console.log("The user email is not valid")
            console.log()
            res.status(200).send(flag);
        }

        // If the email is there - update the code and code time in the DB
        if(flag == "user") {
            console.log("The user email address is in the DB");
            console.log();

            // Updating the code number
            const sqlUpdateCode = "UPDATE usersemails.users SET code = ? WHERE id = ?;";
            db.query(sqlUpdateCode,[random_number, user_index], (err, result) => {});

            // Updating the code time
            let today = new Date();
            let current_time = today.getTime();
            const sqlUpdateCodeTime = "UPDATE usersemails.users SET codetime = ? WHERE id = ?;";
            db.query(sqlUpdateCodeTime,[current_time, user_index], (err, result) => {});
            
            // Starting the code timer for 5 minutes
            console.log("Setting the timer for 5 minutes");
            timerID = setInterval(countFiveMinutes, 300000);

            // Getting the user name from the DB
            const sqlSelectUserName = "SELECT username FROM usersemails.users WHERE id = ?;";
            db.query(sqlSelectUserName,[user_index], (err, result) => {
                user_name = result[0].username
            })

            // Send the email with the code verification
            console.log("Sending the email verification: ",email," random: ", random_number);
            console.log();
            sendEmail(email,random_number);
            
            
        }
        // Sending the user the server response
        res.status(200).send(flag);
    });
    
    
})

app.post('/submitcode', (req,res) => {
    const code = req.body.code; // The input code
    console.log("The user entered the code:",code);

    var flag = "currect code";
    const code_number = Number(code); // Conver the code string to number

    // If the timer is over - 
    if(is_time_over == 1) {
        console.log("5 minutes timer is over");
        flag = "time over";

        // Updating the user code in the DB
        const sqlUpdateCode = "UPDATE usersemails.users SET code = ? WHERE id = ?;";
        db.query(sqlUpdateCode,[random_number, user_index], (err, result) => {});

        // Updating the user code time in the DB
        let today = new Date();
        let current_time = today.getTime();
        const sqlUpdateCodeTime = "UPDATE usersemails.users SET codetime = ? WHERE id = ?;";
        db.query(sqlUpdateCodeTime,[current_time, user_index], (err, result) => {});

        res.status(200).send(flag);
    }
    
    else if (code_number < 100000 || code_number > 999999) {
        console.log("Code not valid")
        flag = "size error";
        res.status(200).send(flag);
    }

    else if(code_number == random_number) {
        console.log("The code is currect");
        console.log();
        flag = user_name;
        res.status(200).send(flag);
    }
    
    else if(code_number != random_number) {
        console.log("The code is wrong");
        flag = "wrong code";
        res.status(200).send(flag);
    }
})

app.post('/resendcode', (req,res) => {
    console.log("resending a code to the email address")
    random_number = Math.floor(Math.random() * 899999 + 100000);
    timerID = setInterval(countFiveMinutes, 300000);
    is_time_over = 0;

    console.log("Updating the code and the code time in the DB");
    // Updating the user code in the DB
    const sqlUpdateCode = "UPDATE usersemails.users SET code = ? WHERE id = ?;";
    db.query(sqlUpdateCode,[random_number, user_index], (err, result) => {});

    // Updating the user code time in the DB
    let today = new Date();
    let current_time = today.getTime();
    const sqlUpdateCodeTime = "UPDATE usersemails.users SET codetime = ? WHERE id = ?;";
    db.query(sqlUpdateCodeTime,[current_time, user_index], (err, result) => {});


    console.log("Resending to:",user_email,",the code:",random_number);
    sendEmail(user_email, random_number)
    res.status(200).send("email sent");

})

app.listen(5001, () => {
    console.log("Server in running on port 5001")
})