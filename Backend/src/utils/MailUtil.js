const mailer = require("nodemailer");

//function

const sendingMail = async (to,subject,text, html = null) => {
    
    const transporter = mailer.createTransport({
        service: "gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:to,
        subject: subject,
        text: text,
        ...(html && { html })
        //html:"<h1>"+text+"</h1>"
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
}

module.exports = {
    sendingMail
}