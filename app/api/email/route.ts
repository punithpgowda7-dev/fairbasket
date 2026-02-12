import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { type, email, name, items, address } = body;

  const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const generateOrderHTML = () => {
    const totalAmount = items.reduce((acc: any, item: any) => acc + item.price, 0);

    const rows = items.map((item: any, index: number) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px 4px; text-align: center; font-size: 12px; color: #666;">${index + 1}</td>
        <td style="padding: 8px 4px;">
          <div style="font-weight: bold; color: #333; font-size: 13px; line-height: 1.2;">${item.title}</div>
          <div style="font-size: 11px; color: #888; margin-top: 2px;">${item.category || 'General'}</div>
        </td>
        <td style="padding: 8px 4px; text-align: center; font-size: 13px;">1</td>
        <td style="padding: 8px 4px; text-align: right; font-weight: bold; font-size: 13px; white-space: nowrap;">₹${item.price.toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    return `
      <div style="font-family: Arial, sans-serif; width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #000; color: #fff; padding: 20px 15px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px;">FairBasket Invoice</h1>
          <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Thanks for your order, ${name}!</p>
        </div>
        <div style="padding: 15px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr>
              <td style="padding-bottom: 5px;"><strong>Order ID:</strong> #${orderId}</td>
              <td style="text-align: right; padding-bottom: 5px;"><strong>Date:</strong> ${date}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top: 5px; border-top: 1px solid #eee;">
                <strong>Shipping To:</strong><br>
                <span style="color: #555;">${address || 'Registered Address'}</span>
              </td>
            </tr>
          </table>
        </div>
        <div style="padding: 0 10px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
            <thead>
              <tr style="background-color: #f1f5f9; text-align: left; color: #444;">
                <th style="padding: 8px 4px; text-align: center; border-bottom: 2px solid #ddd; width: 8%;">Sl.</th>
                <th style="padding: 8px 4px; border-bottom: 2px solid #ddd;">Item</th>
                <th style="padding: 8px 4px; text-align: center; border-bottom: 2px solid #ddd; width: 12%;">Qty</th>
                <th style="padding: 8px 4px; text-align: right; border-bottom: 2px solid #ddd; width: 25%;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
            <tfoot>
              <tr style="background-color: #f9f9f9;">
                <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; color: #333;">Grand Total:</td>
                <td style="padding: 12px 4px; text-align: right; font-weight: bold; font-size: 16px; color: #2563eb; white-space: nowrap;">₹${totalAmount.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div style="padding: 15px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #e0e0e0; background-color: #fcfcfc;">
          <p style="margin: 5px 0;">This is a system generated invoice.</p>
          <p style="margin: 5px 0;">© 2026 FairBasket Marketplace.</p>
        </div>
      </div>
    `;
  };

  const generateWelcomeHTML = () => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; text-align: center; border: 1px solid #eee; border-radius: 10px; background-color: #fff;">
      <h1 style="color: #2563eb; font-size: 24px;">Welcome to FairBasket!</h1>
      <p style="font-size: 16px; color: #333;">Hi ${name},</p>
      <p style="color: #555;">Your account has been successfully created.</p>
      <div style="background: #f4f6f9; padding: 15px; display: inline-block; border-radius: 8px; margin-top: 20px; border: 1px solid #e0e0e0;">
        <p style="margin: 0; font-size: 14px; color: #666;">Registered Email:</p>
        <p style="margin: 5px 0 0; font-size: 18px; font-weight: bold; color: #000;">${email}</p>
      </div>
    </div>
  `;

  // ⚠️ USE YOUR EXISTING APP PASSWORD HERE
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'punithpgowda7@gmail.com', 
      pass: 'adpd xzbc utnf txaa' // KEEP YOUR EXISTING PASSWORD
    }
  });

  try {
    const htmlContent = type === 'order' ? generateOrderHTML() : generateWelcomeHTML();
    const subjectLine = type === 'order' ? `Order Confirmed: #${orderId}` : 'Welcome to FairBasket';

    await transporter.sendMail({
      from: '"FairBasket" <no-reply@fairbasket.com>',
      to: email,
      subject: subjectLine,
      html: htmlContent
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false });
  }
}