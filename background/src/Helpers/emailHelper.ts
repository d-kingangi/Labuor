import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import { mail_configs } from '../Interfaces/mail.configs';

dotenv.config();


/**
 * Creates a transporter using the provided mail configuration.
 *
 * @param {mail_configs} config - The configuration for creating the transporter.
 * @return {Transporter} The created transporter.
 */
function createTransporter(config: mail_configs): Transporter {
    return nodemailer.createTransport(config);
}

const configurations: mail_configs = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    auth: {
        user: process.env?.['EMAIL_USERNAME'] as string,
        pass: process.env?.['EMAIL_PASSWORD'] as string
    }
};

/**
 * Sends an email using the provided message options.
 *
 * @param {any} messageOptions - the options for the email message
 * @return {Promise<void>} a Promise that resolves when the email is sent successfully
 */

export const sendMail = async (messageOptions: any): Promise<void> => {
    try {
        const transporter = createTransporter(configurations);
        await transporter.verify();
        const info = await transporter.sendMail(messageOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending mail:', error);
        throw error; 
    }
};