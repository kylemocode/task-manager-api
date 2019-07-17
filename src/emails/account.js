const sgMail = require('@sendgrid/mail');



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '105306006@nccu.edu.tw',
        subject: 'Welcome to join our app!',
        text: `${name}, welcome to our web app.`
    })
}

const sendCancelEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: '105306006@nccu.edu.tw',
        subject: 'sad for knowing that you are going to leave us',
        text: `We will miss you, ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}