// Email campaign system for marketing automation

export interface EmailCampaign {
  id: string;
  name: string;
  type: 'welcome' | 'abandoned_cart' | 'order_confirmation' | 'shipping_update' | 'promotional' | 'newsletter';
  subject: string;
  template: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isSubscribed: boolean;
  preferences: {
    promotional: boolean;
    newsletter: boolean;
    orderUpdates: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Predefined email templates
export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  WELCOME: {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to Our Jewelry Store!',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Jewelry Store</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin-bottom: 10px;">Welcome to Our Jewelry Store!</h1>
          <p style="color: #7f8c8d; font-size: 18px;">Dear {{firstName}},</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #2c3e50; margin-bottom: 20px;">Thank you for joining us!</h2>
          <p style="margin-bottom: 20px;">We're excited to have you as part of our community. Here's what you can expect from us:</p>
          
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
              <span style="color: #e74c3c; font-weight: bold;">✦</span> Exclusive access to new collections
            </li>
            <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
              <span style="color: #e74c3c; font-weight: bold;">✦</span> Special discounts and promotions
            </li>
            <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
              <span style="color: #e74c3c; font-weight: bold;">✦</span> Expert jewelry care tips
            </li>
            <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
              <span style="color: #e74c3c; font-weight: bold;">✦</span> Priority customer support
            </li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="{{shopUrl}}" style="background-color: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Start Shopping</a>
        </div>
        
        <div style="border-top: 1px solid #ecf0f1; padding-top: 20px; text-align: center; color: #7f8c8d; font-size: 14px;">
          <p>If you have any questions, feel free to contact us at support@jewelrystore.com</p>
          <p>© 2024 Jewelry Store. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
    textContent: `
      Welcome to Our Jewelry Store!
      
      Dear {{firstName}},
      
      Thank you for joining us! We're excited to have you as part of our community.
      
      What you can expect from us:
      • Exclusive access to new collections
      • Special discounts and promotions
      • Expert jewelry care tips
      • Priority customer support
      
      Start shopping: {{shopUrl}}
      
      If you have any questions, contact us at support@jewelrystore.com
      
      © 2024 Jewelry Store. All rights reserved.
    `,
    variables: ['firstName', 'shopUrl'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  ABANDONED_CART: {
    id: 'abandoned_cart',
    name: 'Abandoned Cart Reminder',
    subject: 'Complete Your Purchase - Your Cart is Waiting!',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Complete Your Purchase</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin-bottom: 10px;">Don't Forget Your Cart!</h1>
          <p style="color: #7f8c8d; font-size: 18px;">Hi {{firstName}},</p>
        </div>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #856404; margin-bottom: 15px;">Your cart is waiting for you!</h2>
          <p style="color: #856404; margin-bottom: 15px;">We noticed you left some beautiful items in your cart. Don't let them get away!</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">Items in your cart:</h3>
          {{cartItems}}
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="{{cartUrl}}" style="background-color: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Complete Purchase</a>
        </div>
        
        <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin-bottom: 30px;">
          <p style="color: #155724; margin: 0; font-weight: bold;">Limited Time Offer: Free shipping on orders over £50!</p>
        </div>
        
        <div style="border-top: 1px solid #ecf0f1; padding-top: 20px; text-align: center; color: #7f8c8d; font-size: 14px;">
          <p>Questions? Contact us at support@jewelrystore.com</p>
          <p>© 2024 Jewelry Store. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
    textContent: `
      Don't Forget Your Cart!
      
      Hi {{firstName}},
      
      We noticed you left some beautiful items in your cart. Don't let them get away!
      
      Items in your cart:
      {{cartItems}}
      
      Complete your purchase: {{cartUrl}}
      
      Limited Time Offer: Free shipping on orders over £50!
      
      Questions? Contact us at support@jewelrystore.com
      
      © 2024 Jewelry Store. All rights reserved.
    `,
    variables: ['firstName', 'cartItems', 'cartUrl'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  
  ORDER_CONFIRMATION: {
    id: 'order_confirmation',
    name: 'Order Confirmation',
    subject: 'Order Confirmed - Thank You for Your Purchase!',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #27ae60; margin-bottom: 10px;">Order Confirmed!</h1>
          <p style="color: #7f8c8d; font-size: 18px;">Thank you for your purchase, {{firstName}}!</p>
        </div>
        
        <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #155724; margin-bottom: 15px;">Order Details</h2>
          <p style="color: #155724; margin-bottom: 10px;"><strong>Order Number:</strong> {{orderNumber}}</p>
          <p style="color: #155724; margin-bottom: 10px;"><strong>Order Date:</strong> {{orderDate}}</p>
          <p style="color: #155724; margin-bottom: 10px;"><strong>Total Amount:</strong> £{{orderTotal}}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">Items Ordered:</h3>
          {{orderItems}}
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="{{orderUrl}}" style="background-color: #3498db; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Order</a>
        </div>
        
        <div style="border-top: 1px solid #ecf0f1; padding-top: 20px; text-align: center; color: #7f8c8d; font-size: 14px;">
          <p>Need help? Contact us at support@jewelrystore.com</p>
          <p>© 2024 Jewelry Store. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
    textContent: `
      Order Confirmed!
      
      Thank you for your purchase, {{firstName}}!
      
      Order Details:
      Order Number: {{orderNumber}}
      Order Date: {{orderDate}}
      Total Amount: £{{orderTotal}}
      
      Items Ordered:
      {{orderItems}}
      
      View your order: {{orderUrl}}
      
      Need help? Contact us at support@jewelrystore.com
      
      © 2024 Jewelry Store. All rights reserved.
    `,
    variables: ['firstName', 'orderNumber', 'orderDate', 'orderTotal', 'orderItems', 'orderUrl'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// Email campaign manager
export class EmailCampaignManager {
  private campaigns: EmailCampaign[] = [];
  private subscribers: EmailSubscriber[] = [];

  // Create a new campaign
  async createCampaign(campaignData: Partial<EmailCampaign>): Promise<EmailCampaign> {
    const campaign: EmailCampaign = {
      id: `campaign_${Date.now()}`,
      name: campaignData.name!,
      type: campaignData.type!,
      subject: campaignData.subject!,
      template: campaignData.template!,
      variables: campaignData.variables || [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.campaigns.push(campaign);
    return campaign;
  }

  // Send campaign to subscribers
  async sendCampaign(campaignId: string, filters?: any): Promise<void> {
    const campaign = this.campaigns.find(c => c.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    let subscribers = this.subscribers.filter(s => s.isSubscribed);

    // Apply filters
    if (filters) {
      if (filters.preferences) {
        subscribers = subscribers.filter(s => {
          return Object.entries(filters.preferences).every(([key, value]) => 
            s.preferences[key as keyof typeof s.preferences] === value
          );
        });
      }
    }

    // Send emails to subscribers
    for (const subscriber of subscribers) {
      await this.sendEmail(campaign, subscriber);
    }
  }

  // Send individual email
  private async sendEmail(campaign: EmailCampaign, subscriber: EmailSubscriber): Promise<void> {
    try {
      // In a real app, you would integrate with an email service like SendGrid, Mailgun, etc.
      console.log(`Sending email to ${subscriber.email}: ${campaign.subject}`);
      
      // Here you would:
      // 1. Get the email template
      // 2. Replace variables with actual values
      // 3. Send via email service
      
    } catch (error) {
      console.error(`Failed to send email to ${subscriber.email}:`, error);
    }
  }

  // Add subscriber
  async addSubscriber(subscriberData: Partial<EmailSubscriber>): Promise<EmailSubscriber> {
    const subscriber: EmailSubscriber = {
      id: `subscriber_${Date.now()}`,
      email: subscriberData.email!,
      firstName: subscriberData.firstName,
      lastName: subscriberData.lastName,
      isSubscribed: true,
      preferences: {
        promotional: true,
        newsletter: true,
        orderUpdates: true,
        ...subscriberData.preferences,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.subscribers.push(subscriber);
    return subscriber;
  }

  // Remove subscriber
  async removeSubscriber(email: string): Promise<void> {
    const index = this.subscribers.findIndex(s => s.email === email);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  // Update subscriber preferences
  async updateSubscriberPreferences(email: string, preferences: Partial<EmailSubscriber['preferences']>): Promise<void> {
    const subscriber = this.subscribers.find(s => s.email === email);
    if (subscriber) {
      subscriber.preferences = { ...subscriber.preferences, ...preferences };
      subscriber.updatedAt = new Date();
    }
  }

  // Get campaign statistics
  async getCampaignStats(campaignId: string): Promise<any> {
    // In a real app, you would track opens, clicks, etc.
    return {
      sent: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
    };
  }
}

// Create singleton instance
export const emailCampaignManager = new EmailCampaignManager();
