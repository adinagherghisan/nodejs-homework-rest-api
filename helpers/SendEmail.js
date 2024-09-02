import { MailerSend, EmailParams } from "mailersend";
import dotenv from "dotenv";

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

const mailerSend = new MailerSend({
    apiKey: SENDGRID_API_KEY,
});

export const sendEmail = async (data) => {
    const { to, subject, text, html } = data;

    const emailParams = new EmailParams()
        .setFrom("test2@exemple.com")
        .setTo(to)
        .setSubject(subject)
        .setHtml(html)
        .setText(text);

    await mailerSend.email.send(emailParams);
    return true;
};