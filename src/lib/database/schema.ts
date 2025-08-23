// Database schema definitions for the jewelry website
// This is a TypeScript interface definition that can be used with any database

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  material: string;
  weight?: number;
  dimensions?: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  product?: Product;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  product?: Product;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentIntentId: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

// Database queries and operations
export interface DatabaseOperations {
  // User operations
  createUser(userData: Partial<User>): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;

  // Product operations
  getProducts(filters?: ProductFilters): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  searchProducts(query: string): Promise<Product[]>;

  // Review operations
  getProductReviews(productId: string, page?: number, limit?: number): Promise<Review[]>;
  createReview(reviewData: Partial<Review>): Promise<Review>;
  updateReview(id: string, reviewData: Partial<Review>): Promise<Review>;
  deleteReview(id: string): Promise<void>;
  markReviewHelpful(reviewId: string, userId: string): Promise<void>;

  // Wishlist operations
  getUserWishlist(userId: string): Promise<WishlistItem[]>;
  addToWishlist(userId: string, productId: string): Promise<WishlistItem>;
  removeFromWishlist(userId: string, productId: string): Promise<void>;
  isInWishlist(userId: string, productId: string): Promise<boolean>;

  // Order operations
  createOrder(orderData: Partial<Order>): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  getOrderByNumber(orderNumber: string): Promise<Order | null>;
  getUserOrders(userId: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: Order['status']): Promise<Order>;
}

export interface ProductFilters {
  category?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'newest' | 'name';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Mock database implementation for development
export class MockDatabase implements DatabaseOperations {
  private users: User[] = [];
  private products: Product[] = [];
  private reviews: Review[] = [];
  private wishlistItems: WishlistItem[] = [];
  private orders: Order[] = [];

  // User operations
  async createUser(userData: Partial<User>): Promise<User> {
    const user: User = {
      id: `user_${Date.now()}`,
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      createdAt: new Date(),
      updatedAt: new Date(),
      stripeCustomerId: userData.stripeCustomerId,
    };
    this.users.push(user);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error('User not found');
    
    this.users[userIndex] = { ...this.users[userIndex], ...userData, updatedAt: new Date() };
    return this.users[userIndex];
  }

  // Product operations
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    let filteredProducts = [...this.products];

    if (filters?.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    if (filters?.material) {
      filteredProducts = filteredProducts.filter(p => p.material === filters.material);
    }
    if (filters?.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters?.minRating) {
      filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating!);
    }
    if (filters?.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
    }

    // Sorting
    if (filters?.sortBy) {
      filteredProducts.sort((a, b) => {
        let aValue: any, bValue: any;
        switch (filters.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating;
            bValue = b.rating;
            break;
          case 'newest':
            aValue = a.createdAt;
            bValue = b.createdAt;
            break;
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          default:
            return 0;
        }
        
        if (filters.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    // Pagination
    if (filters?.page && filters?.limit) {
      const start = (filters.page - 1) * filters.limit;
      const end = start + filters.limit;
      filteredProducts = filteredProducts.slice(start, end);
    }

    return filteredProducts;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return this.products.find(product => product.slug === slug) || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.material.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Review operations
  async getProductReviews(productId: string, page = 1, limit = 10): Promise<Review[]> {
    const reviews = this.reviews.filter(review => review.productId === productId);
    const start = (page - 1) * limit;
    const end = start + limit;
    return reviews.slice(start, end);
  }

  async createReview(reviewData: Partial<Review>): Promise<Review> {
    const review: Review = {
      id: `review_${Date.now()}`,
      productId: reviewData.productId!,
      userId: reviewData.userId!,
      rating: reviewData.rating!,
      title: reviewData.title!,
      comment: reviewData.comment!,
      images: reviewData.images || [],
      helpful: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.reviews.push(review);
    return review;
  }

  async updateReview(id: string, reviewData: Partial<Review>): Promise<Review> {
    const reviewIndex = this.reviews.findIndex(review => review.id === id);
    if (reviewIndex === -1) throw new Error('Review not found');
    
    this.reviews[reviewIndex] = { ...this.reviews[reviewIndex], ...reviewData, updatedAt: new Date() };
    return this.reviews[reviewIndex];
  }

  async deleteReview(id: string): Promise<void> {
    const reviewIndex = this.reviews.findIndex(review => review.id === id);
    if (reviewIndex === -1) throw new Error('Review not found');
    
    this.reviews.splice(reviewIndex, 1);
  }

  async markReviewHelpful(reviewId: string, userId: string): Promise<void> {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      review.helpful += 1;
    }
  }

  // Wishlist operations
  async getUserWishlist(userId: string): Promise<WishlistItem[]> {
    return this.wishlistItems.filter(item => item.userId === userId);
  }

  async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
    const existingItem = this.wishlistItems.find(item => 
      item.userId === userId && item.productId === productId
    );
    
    if (existingItem) {
      return existingItem;
    }

    const wishlistItem: WishlistItem = {
      id: `wishlist_${Date.now()}`,
      userId,
      productId,
      createdAt: new Date(),
    };
    
    this.wishlistItems.push(wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const itemIndex = this.wishlistItems.findIndex(item => 
      item.userId === userId && item.productId === productId
    );
    
    if (itemIndex !== -1) {
      this.wishlistItems.splice(itemIndex, 1);
    }
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    return this.wishlistItems.some(item => 
      item.userId === userId && item.productId === productId
    );
  }

  // Order operations
  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const order: Order = {
      id: `order_${Date.now()}`,
      userId: orderData.userId!,
      orderNumber: `ORD-${Date.now()}`,
      status: 'pending',
      items: orderData.items || [],
      subtotal: orderData.subtotal!,
      shipping: orderData.shipping!,
      tax: orderData.tax!,
      total: orderData.total!,
      shippingAddress: orderData.shippingAddress!,
      billingAddress: orderData.billingAddress!,
      paymentIntentId: orderData.paymentIntentId!,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.orders.push(order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orders.find(order => order.id === id) || null;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    return this.orders.find(order => order.orderNumber === orderNumber) || null;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orders.filter(order => order.userId === userId);
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) throw new Error('Order not found');
    
    this.orders[orderIndex].status = status;
    this.orders[orderIndex].updatedAt = new Date();
    return this.orders[orderIndex];
  }
}
