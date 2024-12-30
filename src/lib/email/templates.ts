interface EmailTemplateProps {
  eventTitle: string;
  eventDate: Date;
  eventLocation: string;
  recipientName: string;
}

export const emailTemplates = {
  eventApproved: ({
    eventTitle,
    eventDate,
    eventLocation,
    recipientName,
  }: EmailTemplateProps) => ({
    subject: `Event Approved: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Event Approved!</h2>
        <p>Hello ${recipientName},</p>
        <p>Great news! Your event "${eventTitle}" has been approved and is now live on our platform.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Event Details:</h3>
          <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }
          )}</p>
          <p><strong>Location:</strong> ${eventLocation}</p>
        </div>
        
        <p>You can now start promoting your event and managing registrations.</p>
        <p>Best regards,<br>The Tourism AI Team</p>
      </div>
    `,
  }),

  eventRejected: ({
    eventTitle,
    recipientName,
  }: Partial<EmailTemplateProps>) => ({
    subject: `Event Update: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Event Update</h2>
        <p>Hello ${recipientName},</p>
        <p>We regret to inform you that your event "${eventTitle}" could not be approved at this time.</p>
        
        <p>This could be due to one or more of the following reasons:</p>
        <ul style="color: #4b5563;">
          <li>Incomplete or unclear event information</li>
          <li>Content that doesn't meet our community guidelines</li>
          <li>Duplicate event listing</li>
        </ul>
        
        <p>You can submit a new event that addresses these concerns.</p>
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        
        <p>Best regards,<br>The Tourism AI Team</p>
      </div>
    `,
  }),

  eventReminder: ({
    eventTitle,
    eventDate,
    eventLocation,
    recipientName,
  }: EmailTemplateProps) => ({
    subject: `Reminder: ${eventTitle} is Coming Up!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Event Reminder</h2>
        <p>Hello ${recipientName},</p>
        <p>This is a friendly reminder about the upcoming event you're interested in:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${eventTitle}</h3>
          <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }
          )}</p>
          <p><strong>Location:</strong> ${eventLocation}</p>
        </div>
        
        <p>Don't forget to add this event to your calendar!</p>
        <p>We look forward to seeing you there.</p>
        
        <p>Best regards,<br>The Tourism AI Team</p>
      </div>
    `,
  }),

  subscriptionConfirmation: ({
    eventTitle,
    eventDate,
    eventLocation,
    recipientName,
  }: EmailTemplateProps) => ({
    subject: `Subscribed to: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Subscription Confirmed</h2>
        <p>Hello ${recipientName},</p>
        <p>You have successfully subscribed to updates for the following event:</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${eventTitle}</h3>
          <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }
          )}</p>
          <p><strong>Location:</strong> ${eventLocation}</p>
        </div>
        
        <p>You will receive notifications about any updates or changes to this event.</p>
        <p>You can unsubscribe from these notifications at any time through your account settings.</p>
        
        <p>Best regards,<br>The Tourism AI Team</p>
      </div>
    `,
  }),
};
