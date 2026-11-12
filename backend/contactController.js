const transporter = require("../config/mailConfig");

exports.sendContactForm = async (req, res) => {

    try {

        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                message: "All fields are required."
            });

        }

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: "Info@pprlogistics.net",

            replyTo: email,

            subject: `New Contact Form - ${subject}`,

            html: `
                <h2>New Contact Request</h2>

                <table border="1" cellpadding="10">

                    <tr>
                        <td><b>Name</b></td>
                        <td>${name}</td>
                    </tr>

                    <tr>
                        <td><b>Email</b></td>
                        <td>${email}</td>
                    </tr>

                    <tr>
                        <td><b>Subject</b></td>
                        <td>${subject}</td>
                    </tr>

                    <tr>
                        <td><b>Message</b></td>
                        <td>${message}</td>
                    </tr>

                </table>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to send email."
        });

    }

};