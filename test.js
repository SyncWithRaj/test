// ===============================
// Interfaces
// ===============================

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

interface Order {
  id: number;
  userId: number;
  products: Product[];
  total: number;
}

// ==============================
// Variables
// ===============================

const TAX_RATE = 0.18;
let globalOrderCounter = 0;

const users: User[] = [];
const products: Product[] = [];
const orders: Order[] = [];

// ===============================
// Utility Arrow Functions
// ===============================

const generateId = (): number => {
  return Math.floor(Math.random() * 100000);
};

const calculateTax = (amount: number): number => {
  return amount * TAX_RATE;
};

const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// ===============================
// Normal Functions
// ===============================

function findUserById(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

function findProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

function log(message: string): void {
  console.log(`[LOG]: ${message}`);
}

// ===============================
// Class
// ===============================

class OrderService {
  private orders: Order[] = [];

  constructor() {
    log("OrderService initialized");
  }

  // Method
  createOrder(userId: number, productIds: number[]): Order {
    const user = findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const orderProducts: Product[] = [];

    productIds.forEach((id) => {
      const product = findProductById(id);
      if (product) {
        orderProducts.push(product);
      }
    });

    const subtotal = this.calculateSubtotal(orderProducts);
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;

    const order: Order = {
      id: generateId(),
      userId,
      products: orderProducts,
      total
    };

    this.orders.push(order);
    globalOrderCounter++;

    return order;
  }

  // Method
  calculateSubtotal(products: Product[]): number {
    return products.reduce((sum, p) => sum + p.price, 0);
  }

  // Method
  listOrders(): Order[] {
    return this.orders;
  }

  // Static Method
  static version(): string {
    return "1.0.0";
  }
}

// ===============================
// Another Class
// ===============================

class UserService {
  private users: User[] = [];

  addUser(name: string, email: string): User {
    const user: User = {
      id: generateId(),
      name,
      email,
      isActive: true
    };

    this.users.push(user);
    users.push(user);

    return user;
  }

  deactivateUser(userId: number): void {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.isActive = false;
    }
  }

  listUsers(): User[] {
    return this.users;
  }
}

// ===============================
// Async Function
// ===============================

async function simulatePayment(amount: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      log(`Payment processed: ${formatCurrency(amount)}`);
      resolve(true);
    }, 500);
  });
}

// ===============================
// Arrow Function with Map
// ===============================

const getProductTitles = (items: Product[]): string[] => {
  return items.map((p) => p.title);
};

// ===============================
// Data Initialization
// ===============================

function seedProducts() {
  products.push(
    { id: 1, title: "Laptop", price: 1200 },
    { id: 2, title: "Mouse", price: 40 },
    { id: 3, title: "Keyboard", price: 100 },
    { id: 4, title: "Monitor", price: 300 }
  );
}

// ===============================
// Main Function
// ===============================

async function main() {
  seedProducts();

  const userService = new UserService();
  const orderService = new OrderService();

  const user = userService.addUser("Raj", "raj@example.com");

  const order = orderService.createOrder(user.id, [1, 2, 3]);

  const success = await simulatePayment(order.total);

  if (success) {
    log("Order completed successfully");
  }

  const titles = getProductTitles(order.products);

  console.log("Ordered Products:", titles);
  console.log("Total:", formatCurrency(order.total));

  console.log("All Orders:", orderService.listOrders());
}

main();

// ===============================
// Extra Utility Functions
// ===============================

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomPrice(): number {
  return Math.floor(Math.random() * 1000);
}

const sum = (a: number, b: number): number => a + b;

const multiply = (a: number, b: number): number => {
  return a * b;
};

const logger = {
  info: (msg: string) => console.log("INFO:", msg),
  error: (msg: string) => console.error("ERROR:", msg)
};

export {
  User,
  Product,
  Order,
  OrderService,
  UserService,
  simulatePayment,
  sum,
  multiply
};
