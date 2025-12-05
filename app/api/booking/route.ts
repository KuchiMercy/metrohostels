import nodemailer from "nodemailer";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    roomName,
    price,
    checkIn,
    checkOut,
    adults,
    children,
    customerEmail,
    firstName,
    lastName,
    days,
  } = body;

  try {
    /*
     * 1. SEND EMAIL TO YOU (ADMIN)
     */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MetroHostels" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Reservation Confirmation",
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; background-color: #000; padding: 30px;">
    <!-- Logo -->
    <div style="display: flex; justify-content: center; gap: 4px; text-align: center; margin-bottom: 30px;">
      <img src="cid:metro" alt="Metro Hostels Logo" style="width: 50px; height: auto;" />
    </div>

    <!-- Header -->
    <h2 style="color: #FFD700; text-align: center; margin-bottom: 20px;">Reservation Confirmation</h2>

    <!-- Booking Details Card -->
    <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">Room</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${roomName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">Total Price</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">₦${
            Number(price) * days
          }</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">Check-in</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${checkIn}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">Check-out</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${checkOut}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">Adults</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${adults}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">Children</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${children}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">Customer Email</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${customerEmail}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">First Name</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${firstName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px; border-bottom: 1px solid #eee;">Last Name</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${lastName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 10px;">Total Days</td>
          <td style="padding: 10px;">${days}</td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <p style="margin-top: 20px; text-align: center; font-style: italic; color: #555;">
      This is an automated email from MetroHostels. Please do not reply.
    </p>
  </div>
`,
      attachments: [
        {
          filename: "metro.jpeg",
          path: "./public/assets/metro.jpeg",
          cid: "metro",
        },
      ],
    });

    /*
     * 2. INITIALIZE PAYSTACK PAYMENT
     */
    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: customerEmail,
        amount: Number(price) * 100,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`,
        metadata: {
          roomName,
          checkIn,
          checkOut,
          adults,
          children,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      status: "success",
      authorization_url: paystackRes.data.data.authorization_url,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred");
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
