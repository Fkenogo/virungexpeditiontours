# Email Notifications Setup

Email notifications have been configured to automatically send emails when new bookings are created.

## What Gets Sent

### Customer Confirmation Email
When a customer makes a booking, they receive:
- ✅ Booking confirmation with all details
- 📅 Tour name, date, and number of people
- 💰 Total price
- 🔢 Unique booking ID for reference
- 📞 Contact information for questions
- 📋 Next steps (availability check, payment, itinerary)

### Admin Alert Email  
The admin receives:
- 🔔 Immediate notification of new booking
- 👤 Full customer information (name, email, phone)
- 📋 All booking details
- 💬 Special requests from customer
- 🔗 Quick action links (call, WhatsApp)
- ✅ Reminder to confirm within 24 hours

## Resend API Setup

The system uses Resend for email delivery. The `RESEND_API_KEY` secret is already configured in your project.

### Update Email Addresses

To use your own email addresses, update these in the edge function:

1. **Sender Email** (line 90 in `send-booking-notification/index.ts`):
   ```typescript
   from: "Virunga Expedition Tours <bookings@resend.dev>"
   ```
   Change to your verified domain email.

2. **Admin Email** (line 222 in `send-booking-notification/index.ts`):
   ```typescript
   to: ["info@virungaexpeditiontours.com"]
   ```
   Change to your actual admin email.

### Verify Your Domain in Resend

1. Go to [resend.com/domains](https://resend.com/domains)
2. Add your domain (e.g., `virungaexpeditiontours.com`)
3. Add the DNS records provided by Resend
4. Wait for verification (usually takes a few minutes)
5. Update the edge function with your domain email

## Testing Emails

### Test in Development
1. Make a test booking through any tour page
2. Check the browser console for edge function logs
3. Check your email for the confirmation

### View Edge Function Logs
```
# View recent logs
supabase functions logs send-booking-notification

# Follow logs in real-time
supabase functions logs send-booking-notification --follow
```

## Email Templates

Both emails use professional HTML templates with:
- ✨ Branded headers with gradients
- 📱 Mobile-responsive design
- 🎨 Consistent styling
- 🔗 Call-to-action buttons
- 📋 Detailed information sections

### Customizing Templates

To modify email templates, edit the HTML in:
`supabase/functions/send-booking-notification/index.ts`

The templates are inline HTML strings starting around lines 90 and 222.

## Error Handling

The system includes robust error handling:
- **Retry Logic**: 3 attempts with 2-second delays
- **Graceful Degradation**: Booking succeeds even if emails fail
- **Detailed Logging**: All email attempts logged for debugging
- **User Feedback**: Toast notifications inform users of email status

## Monitoring

### Check Email Delivery
1. View logs in Lovable Cloud backend
2. Check Resend dashboard for delivery status
3. Monitor toast notifications in the app

### Common Issues
- **403 Forbidden**: API key invalid or domain not verified
- **400 Bad Request**: Email format or validation error
- **Network errors**: Retry logic will handle temporary failures

## Future Enhancements

Consider adding:
- 📧 Booking confirmation emails when admin confirms
- ❌ Cancellation notification emails
- 📝 Payment received confirmation
- 📅 Reminder emails before tour date
- ⭐ Follow-up emails for reviews
