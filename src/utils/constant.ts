export const MONGO_URI = process.env.MONGODB_URL as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const dbName = process.env.DBNAME as string;
export const APP_ID = process.env.NEXT_PUBLIC_APP_ID as string;
export const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY as string;
export const APP_SECRET = process.env.APP_SECRET as string;
export const APP_CLUSTER = process.env.NEXT_PUBLIC_APP_CLUSTER as string;
export const APP_CHANNEL = process.env.NEXT_PUBLIC_APP_PUSHER_CHANNEL as string;
export const AUTH_EMAIL = process.env.AUTH_EMAIL as string;
export const AUTH_PASS = process.env.AUTH_PASS as string;
export const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_APP_GEOAPIFY_API_KEY as string;
export const ORDER_CREATE = {
  subject: "New Pizza Order Received!",
  message: `
    <h1>New Order Notification</h1>
    <p>Hello Admin,</p>
    <p>A new order has just been placed. Below are the order details:</p>
    <p><strong>Order Details:</strong></p>
    <ul>
      <li><strong>Order ID:</strong> {{orderId}}</li>
      <li><strong>Customer Name:</strong> {{customerName}}</li>
      <li><strong>Customer Email:</strong> {{customerEmail}}</li>
      <li><strong>Customer Phone:</strong> {{customerPhone}}</li>
      <li><strong>Total Amount:</strong> {{ totalAmount }}</li>
      <li><strong>Delivery Address:</strong> {{deliveryAddress}}</li>
    </ul>
    <p>Please log in to the admin panel for more details and to process the order:</p>
    <a href="{{adminPanelUrl}}" style="background-color: #FF5733; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Admin Panel</a>
    <p>Best Regards,</p>
    <p>The Pizza Team</p>
  `,
};

export const ORDER_STATUS = {
  subject: "Your Pizza Order Status Update",
  message: `
    <h1>Order Status Update</h1>
    <p>We have an update regarding your pizza order:</p>
    <p><strong>Current Status: {{status}}</strong></p>
    <p>Order ID: {{orderId}}</p>
    <p>Thank you for choosing our service!</p>
    <p>Best Regards,</p>
    <p>The Pizza Team</p>
  `,
};

export const ORDER_CONFIRMATION = {
  subject: "Your Pizza Order is Confirmed!",
  message: `
    <h1>Order Confirmation</h1>
    <p>We are delighted to confirm your order. Your pizza will be delivered shortly!</p>
    <p><strong>Order Details:</strong></p>
    <ul>
      <li>Order ID: {{orderId}}</li>
      <li>Total Amount: {{ totalAmount }}</li>
    </ul>
    <p>Estimated Delivery Time: {{deliveryTime}}</p>
    <p>Thank you for trusting us to serve you delicious pizza!</p>
    <p>Best Regards,</p>
    <p>The Pizza Team</p>
  `,
};
