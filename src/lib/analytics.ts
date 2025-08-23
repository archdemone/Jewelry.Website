// Analytics system for tracking user interactions and e-commerce events

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

export interface PageViewEvent {
  page: string;
  title: string;
  referrer?: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

export interface EcommerceEvent {
  event: 'add_to_cart' | 'remove_from_cart' | 'view_item' | 'purchase' | 'begin_checkout' | 'add_to_wishlist' | 'remove_from_wishlist';
  productId: string;
  productName: string;
  category: string;
  price: number;
  quantity?: number;
  currency: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

class Analytics {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private pageViews: PageViewEvent[] = [];
  private ecommerceEvents: EcommerceEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadUserId();
    this.setupAutoFlush();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadUserId(): void {
    this.userId = localStorage.getItem('analytics_user_id') || undefined;
  }

  private setupAutoFlush(): void {
    setInterval(() => {
      this.flush();
    }, 30000);

    window.addEventListener('beforeunload', () => {
      this.flush();
    });
  }

  trackEvent(category: string, action: string, label?: string, value?: number, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      event: 'custom_event',
      category,
      action,
      label,
      value,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
    };

    this.events.push(event);
    this.sendToAnalytics(event);
  }

  trackPageView(page: string, title: string, referrer?: string): void {
    const pageView: PageViewEvent = {
      page,
      title,
      referrer,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
    };

    this.pageViews.push(pageView);
    this.sendPageViewToAnalytics(pageView);
  }

  trackEcommerceEvent(
    event: EcommerceEvent['event'],
    productId: string,
    productName: string,
    category: string,
    price: number,
    quantity: number = 1,
    currency: string = 'GBP'
  ): void {
    const ecommerceEvent: EcommerceEvent = {
      event,
      productId,
      productName,
      category,
      price,
      quantity,
      currency,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
    };

    this.ecommerceEvents.push(ecommerceEvent);
    this.sendEcommerceEventToAnalytics(ecommerceEvent);
  }

  trackSearch(query: string, resultsCount: number): void {
    this.trackEvent('search', 'search', query, resultsCount, {
      query,
      resultsCount,
    });
  }

  trackFilter(category: string, filterType: string, filterValue: string): void {
    this.trackEvent('filter', 'apply_filter', `${filterType}:${filterValue}`, undefined, {
      category,
      filterType,
      filterValue,
    });
  }

  trackEngagement(action: string, duration?: number): void {
    this.trackEvent('engagement', action, undefined, duration, {
      action,
      duration,
    });
  }

  trackError(error: string, errorCode?: string, context?: string): void {
    this.trackEvent('error', 'error_occurred', error, undefined, {
      error,
      errorCode,
      context,
    });
  }

  trackPerformance(metric: string, value: number): void {
    this.trackEvent('performance', metric, undefined, value, {
      metric,
      value,
    });
  }

  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('analytics_user_id', userId);
  }

  clearUserId(): void {
    this.userId = undefined;
    localStorage.removeItem('analytics_user_id');
  }

  private async sendToAnalytics(event: AnalyticsEvent): Promise<void> {
    try {
      console.log('Analytics Event:', event);
      
      await fetch('/api/analytics/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  private async sendPageViewToAnalytics(pageView: PageViewEvent): Promise<void> {
    try {
      console.log('Page View:', pageView);
      
      await fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageView),
      });
    } catch (error) {
      console.error('Failed to send page view:', error);
    }
  }

  private async sendEcommerceEventToAnalytics(ecommerceEvent: EcommerceEvent): Promise<void> {
    try {
      console.log('E-commerce Event:', ecommerceEvent);
      
      await fetch('/api/analytics/ecommerce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ecommerceEvent),
      });
    } catch (error) {
      console.error('Failed to send e-commerce event:', error);
    }
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0 && this.pageViews.length === 0 && this.ecommerceEvents.length === 0) {
      return;
    }

    try {
      await fetch('/api/analytics/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: this.events,
          pageViews: this.pageViews,
          ecommerceEvents: this.ecommerceEvents,
        }),
      });

      this.events = [];
      this.pageViews = [];
      this.ecommerceEvents = [];
    } catch (error) {
      console.error('Failed to flush analytics events:', error);
    }
  }

  async getAnalyticsData(startDate: Date, endDate: Date): Promise<any> {
    try {
      const response = await fetch(`/api/analytics/data?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to get analytics data:', error);
      return null;
    }
  }
}

export const analytics = new Analytics();

export function useAnalytics() {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackEcommerceEvent: analytics.trackEcommerceEvent.bind(analytics),
    trackSearch: analytics.trackSearch.bind(analytics),
    trackFilter: analytics.trackFilter.bind(analytics),
    trackEngagement: analytics.trackEngagement.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
    clearUserId: analytics.clearUserId.bind(analytics),
  };
}
