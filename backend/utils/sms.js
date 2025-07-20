import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_SERVICE_SID; // optional
const phoneNumberFrom = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

/**
 * Sends a verification SMS using Twilio Messaging API
 * @param {string} phoneNumber - Recipient phone number (e.g., +91xxxxxx)
 * @param {string} verificationCode - 6-digit verification code
 */
export const sendVerificationSMS = async (phoneNumber, verificationCode) => {
  try {
    const message = await client.messages.create({
      body: `Your Simpler verification code is ${verificationCode} the code will expire in 24 hours.`,
      to: `+91${phoneNumber}`,
      from: messagingServiceSid ? undefined : phoneNumberFrom,
      messagingServiceSid: messagingServiceSid || undefined, 
    });

    return message;
  } catch (error) {
    console.error(" Failed to send SMS:", error.message);
    throw new Error("SMS sending failed");
  }
};
