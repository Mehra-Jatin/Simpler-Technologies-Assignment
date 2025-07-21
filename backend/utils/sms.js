import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_SERVICE_SID;
const phoneNumberFrom = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

/**
 * Sends a verification SMS using Twilio Messaging API
 * @param {string} phoneNumber - Recipient phone number (e.g., 9876543210)
 * @param {string} verificationCode - 6-digit verification code
 * @returns {Promise<string>} - Returns the SID of the sent message
 */
export const sendVerificationSMS = async (phoneNumber, verificationCode) => {
  try {
    const message = await client.messages.create({
      body: `Your Simpler verification code is ${verificationCode}. This code will expire in 24 hours.`,
      to: `+91${phoneNumber}`,
      ...(messagingServiceSid
        ? { messagingServiceSid }
        : { from: phoneNumberFrom }),
    });

    console.log("✅ SMS sent successfully:", message.sid);
    return message.sid;
  } catch (error) {
    console.error("❌ Failed to send SMS:", error);
    throw new Error("SMS sending failed");
  }
};
