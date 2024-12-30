import nodemailer from "nodemailer";
import { emailTemplates } from "./templates";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface SendEmailOptions {
  to: string;
  template: keyof typeof emailTemplates;
  data: any;
}

export async function sendEmail({ to, template, data }: SendEmailOptions) {
  try {
    const { subject, html } = emailTemplates[template](data);

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });

    console.log(`Email sent successfully: ${template} to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

// Helper functions for common email scenarios
export async function sendEventApprovalEmail(
  recipientEmail: string,
  eventData: {
    title: string;
    date: Date;
    location: string;
    recipientName: string;
  }
) {
  return sendEmail({
    to: recipientEmail,
    template: "eventApproved",
    data: {
      eventTitle: eventData.title,
      eventDate: eventData.date,
      eventLocation: eventData.location,
      recipientName: eventData.recipientName,
    },
  });
}

export async function sendEventRejectionEmail(
  recipientEmail: string,
  eventData: {
    title: string;
    recipientName: string;
  }
) {
  return sendEmail({
    to: recipientEmail,
    template: "eventRejected",
    data: {
      eventTitle: eventData.title,
      recipientName: eventData.recipientName,
    },
  });
}

export async function sendEventReminderEmail(
  recipientEmail: string,
  eventData: {
    title: string;
    date: Date;
    location: string;
    recipientName: string;
  }
) {
  return sendEmail({
    to: recipientEmail,
    template: "eventReminder",
    data: {
      eventTitle: eventData.title,
      eventDate: eventData.date,
      eventLocation: eventData.location,
      recipientName: eventData.recipientName,
    },
  });
}

export async function sendSubscriptionConfirmationEmail(
  recipientEmail: string,
  eventData: {
    title: string;
    date: Date;
    location: string;
    recipientName: string;
  }
) {
  return sendEmail({
    to: recipientEmail,
    template: "subscriptionConfirmation",
    data: {
      eventTitle: eventData.title,
      eventDate: eventData.date,
      eventLocation: eventData.location,
      recipientName: eventData.recipientName,
    },
  });
}
