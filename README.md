# 🔐 Full Stack Auth + Payments System

This is a **Full Stack Web Application** with user authentication, email & SMS OTP verification, secure JWT token management, and Razorpay payment integration.

Built using:

- **Backend**: Node.js, Express, MongoDB, JWT, Razorpay, Twilio, Nodemailer
- **Frontend**: Vite + React + daisy UI + Zustand
- **Database**: MongoDB Atlas

---
## 🔗 Live Demo 

https://simpler-technologies-assignment.vercel.app/

>⚠️ **Note:** It may take **a few seconds to load** the app as the backend is hosted on **Render**, which **spins down the server after 15 minutes of inactivity**.
---

## 🚀 Features

- ✅ User Signup with Email & SMS OTP (via Nodemailer / Twilio)
- ✅ JWT Authentication (Access + Refresh Tokens)
- ✅ Email Verification & Resend OTP
- ✅ Login & Logout with cookie-based session
- ✅ Razorpay Payment Integration
- ✅ Order Management & History
- ✅ Protected Routes using Middleware

---
## �‍💻 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mehra-Jatin/Simpler-Technologies-Assignment
cd Simpler-Technologies-Assignment
```
2️⃣ Setup Backend
```bash
cd backend
npm install
```
Create a .env file inside the server/ folder and add the following:

.env
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
PORT=
NODE_ENV=

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+91xxxxxxxxxx
TWILIO_MESSAGING_SERVICE_SID=your_msg_service_id

RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_API_SECRET=your_razorpay_secret

CLIENT_URL=http://localhost:5173

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

```
Then start the backend server:

```bash
npm run dev
```
3️⃣ Setup Frontend

```bash
cd ../client
npm install
```
Create a .env file inside the client/ folder and add the following:

.env
```
VITE_SERVER_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Then start the frontend server:


```bash
npm run dev
```
# 🔐 Auth API Endpoints

---

## ✅ POST `/api/auth/signup`

**Description:**  
Register a new user and send an OTP via **email** and **SMS** for verification.

---

## FLOW:

1. **Generates a 6-digit verification code (`verificationToken`):**  
   - This code is valid for **24 hours** and stored in the user document.

1. **Stores the user in the database:**  
   - Sets `isVerified: false` initially until OTP is verified.

3. **Sends the OTP via:**
   - ✅ **Email** using the configured `sendVerificationEmail()` function.
   - 🚫 **SMS** using `sendVerificationSMS()` *(currently commented out)*

---

#### 📌 Note on SMS OTP:

- **Twilio** is used for sending SMS-based OTPs.
- **Twilio trial accounts only allow SMS to verified phone numbers.**

To enable **real SMS OTP functionality**:

1. Upgrade to a **paid Twilio account**.
2. Set the required environment variables in your `.env` file:

    ```env
    TWILIO_ACCOUNT_SID=your_sid
    TWILIO_AUTH_TOKEN=your_token
    TWILIO_PHONE_NUMBER=your_twilio_number
    ```

3. Uncomment the line in the code:

    ```js
    await sendVerificationSMS(user.phoneNo, verificationCode);
    ```

---

# ✅ POST /api/auth/login

**Purpose:**  
Log in an existing and **verified** user.

---

## FLOW :

- **Generates tokens:**
  - 🔑 **Access Token** — expires in **1 hour**
  - ♻️ **Refresh Token** — expires in **7 days**

- **Stores refresh token:**
  - Hashes the refresh token using `bcrypt` and stores it in the database (`user.refreshToken`).

- **Sets both tokens as cookies:**
  - `token`: Access token  
    - `HttpOnly: true`  
    - `Secure: true` *(in production)*  
    - `SameSite: None` or `Lax`
  - `refresh`: Refresh token  
    - `HttpOnly: true`  
    - `Secure: true` *(in production)*  
    - `SameSite: None` or `Lax`

---
# ✅ POST `api/auth/refresh-token`

## Purpose
Refresh JWT tokens using the refresh token stored in cookies.

---

## Flow

1. ✅ **Check for Refresh Token in Cookies**
   - Ensures the refresh token is included in the request cookies.
   - If missing, respond with `401 Unauthorized`.

2. 🔐 **Verify Refresh Token**
   - Uses `jwt.verify()` to decode and validate the refresh token.
   - If invalid or expired, respond with `403 Forbidden`.

3. 👤 **Find the User**
   - Extracts user ID from the decoded token.
   - Queries the database to find the user by ID.

4. 🔄 **Compare Refresh Token**
   - Compares the refresh token from cookies with the hashed token stored in the DB using `bcrypt.compare()`.
   - If they don't match, respond with `403 Forbidden`.

5. 🔧 **Generate New Tokens**
   - Creates a new:
     - **Access Token** (e.g., expires in 1 hour)
     - **Refresh Token** (e.g., expires in 7 days)

6. 💾 **Update Refresh Token in DB**
   - Hashes the new refresh token and stores it in the user's DB record.

7. 🍪 **Set New Tokens in Cookies**
   - Sends the new access and refresh tokens back in HTTP-only, secure cookies.

---
# ✅ POST `api/auth/logout`

## Purpose
Log the user out by clearing authentication cookies.

---

## Flow

1. ❌ **Clear Cookies**
   - Clears both the access token and refresh token cookies using `res.clearCookie()`.

 # ✅ POST `api/auth/verify`

## Purpose
Verify a user with the verification code sent during signup.

---

## Flow

1. 📥 **Accept Input**
   - Accepts `{ verificationCode }` in the request body.

2. 🔍 **Find User**
   - Searches for a user with:
     - Matching `verificationToken`
     - `verificationTokenExpiry` greater than the current time.

3. ✅ **Validate Token**
   - Ensures the token exists and hasn't expired.

4. 🟢 **Mark User as Verified**
   - Sets `isVerified` to `true`.
   - Clears `verificationToken` and `verificationTokenExpiry`.

5. 🔑 **Generate Tokens**
   - Creates a new **Access Token** and **Refresh Token**.

6. 🍪 **Set Cookies**
   - Stores both tokens in HTTP-only, secure cookies.


---

# ✅ GET `api/auth/me`

## Purpose
Get the authenticated user's profile.

### Protected Route
Uses `authMiddleware` to ensure the user is authenticated.

---

## Flow

1. 🛡️ **Middleware Check**
   - `authMiddleware` checks the validity of the access token stored in `cookies.token`.

2. 👤 **Fetch User**
   - Retrieves the user's details from the database using the ID from the token.
   - Excludes sensitive fields like password and refresh token.



---






# 🛒 Order API Endpoints

All endpoints are **protected** and require valid authentication via `authMiddleware`.

---

 ## ✅ POST `api/orders/create-order`

## Purpose
Create a new Razorpay order and save it to the database.

---

## Protected
✅ Yes — uses `authMiddleware`

---

## Flow

- Extracts authenticated user ID from `req.user`.
- Creates a Razorpay order with the specified amount (`amount * 100` in paise).
- Stores the order in MongoDB with:
  - `user`
  - `items`
  - `totalAmount`
  - `paymentStatus: Pending`
  - `OrderId` (Razorpay ID)
- Returns Razorpay order details and DB order ID.

---

## Success Response

```json
{
  "razorpayOrderId": "order_QvogBIfiAitJN9",
  "orderId": "64b4a7cc2c1fbd001f98f4a7",
  "amount": 799900
}
```


# ✅ POST `api/orders/verify-payment`

## Purpose
Verify the Razorpay payment signature and update payment status in the database.

---

## Protected
✅ Yes — uses `authMiddleware`

---

## Flow

- Generates a SHA256 HMAC signature using `razorpayOrderId|razorpayPaymentId`.
- Compares the generated signature with `razorpaySignature`.
- If matched:
  - Updates the order status to `Paid`
  - Stores `paymentId`
  - Responds with success.
- If not matched:
  - Updates the order status to `Failed`
  - Responds with failure.
- If order not found, returns `404 Not Found`.

---

## Success Response

```json
{
  "success": true
}
```

# ✅ GET `api/orders/get`

## Purpose
Retrieve all orders placed by the authenticated user.

---

## Protected
✅ Yes — uses `authMiddleware`

---

## Flow

- Extracts the authenticated user ID from `req.user`.
- Queries all orders for the user from MongoDB, sorted by most recent.
- If orders exist:
  - Returns an array of order objects.
- If no orders found:
  - Returns a `404 Not Found` with appropriate message.

---

## Success Response

```json
[
  {
    "_id": "64b4a7cc2c1fbd001f98f4a7",
    "user": "687d74b80cb...",
    "items": "1x Shoes",
    "totalAmount": 7999,
    "paymentStatus": "Paid",
    "OrderId": "order_QvogBIfiAitJN9",
    "paymentId": "pay_QvogJdEa52S5Hp",
    "createdAt": "2025-07-21T18:28:05.729Z"
  }
]

```


# ✅ POST `api/orders/verify-payment`

## Purpose
Verify the Razorpay payment signature and update payment status in the database.

---

## Protected
✅ Yes — uses `authMiddleware`

---

## Flow

- Generates a SHA256 HMAC signature using `razorpayOrderId|razorpayPaymentId`.
- Compares the generated signature with `razorpaySignature`.
- If matched:
  - Updates the order status to `Paid`
  - Stores `paymentId`
  - Responds with success.
- If not matched:
  - Updates the order status to `Failed`
  - Responds with failure.
- If order not found, returns `404 Not Found`.

---

## Success Response

```json
{
  "success": true
}
```

# ✅ GET `api/orders/get`

## Purpose
Retrieve all orders placed by the authenticated user.

---

## Protected
✅ Yes — uses `authMiddleware`

---

## Flow

- Extracts the authenticated user ID from `req.user`.
- Queries all orders for the user from MongoDB, sorted by most recent.
- If orders exist:
  - Returns an array of order objects.
- If no orders found:
  - Returns a `404 Not Found` with appropriate message.

---

## Success Response

```json
[
  {
    "_id": "64b4a7cc2c1fbd001f98f4a7",
    "user": "687d74b80cb...",
    "items": "1x Shoes",
    "totalAmount": 7999,
    "paymentStatus": "Paid",
    "OrderId": "order_QvogBIfiAitJN9",
    "paymentId": "pay_QvogJdEa52S5Hp",
    "createdAt": "2025-07-21T18:28:05.729Z"
  }
]
