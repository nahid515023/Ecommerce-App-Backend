# E-commerce App Backend

A robust and scalable backend API for an e-commerce application built with Node.js, Express, TypeScript, and Prisma ORM with MySQL database.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (Admin/User)
- **User Management**: Complete user registration, login, profile management, and address management
- **Product Management**: CRUD operations for products with full-text search capability
- **Shopping Cart**: Add, update, remove items from cart
- **Order Management**: Create orders, track order status, order history
- **Admin Panel**: Admin-only features for managing users, products, and orders
- **Full-Text Search**: Advanced product search functionality
- **Database Migrations**: Structured database schema management with Prisma

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Development**: Nodemon, ts-node

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── controllers/           # Route controllers
│   │   ├── auth.ts           # Authentication logic
│   │   ├── cart.ts           # Shopping cart operations
│   │   ├── orders.ts         # Order management
│   │   ├── products.ts       # Product CRUD operations
│   │   └── user.ts           # User management
│   ├── middlewares/          # Express middlewares
│   │   ├── admin.ts          # Admin authorization
│   │   ├── auth.ts           # Authentication middleware
│   │   └── errors.ts         # Error handling
│   ├── routes/               # API routes
│   │   ├── auth.ts           # Authentication routes
│   │   ├── cart.ts           # Cart routes
│   │   ├── orders.ts         # Order routes
│   │   ├── products.ts       # Product routes
│   │   ├── user.ts           # User routes
│   │   └── index.ts          # Route aggregation
│   ├── schema/               # Validation schemas
│   ├── exceptions/           # Custom exception classes
│   ├── types/                # TypeScript type definitions
│   ├── index.ts              # Application entry point
│   └── secrets.ts            # Environment configuration
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nahid515023/Ecommerce-App-Backend.git
   cd Ecommerce-App-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/ecommerce_db"
   JWT_SECRET="your-jwt-secret-key"
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/signup` | User registration | Public |
| POST | `/auth/login` | User login | Public |
| GET | `/auth/me` | Get current user info | Private |

### User Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| PUT | `/user` | Update user profile | Private |
| POST | `/user/address` | Add user address | Private |
| GET | `/user/address` | Get user addresses | Private |
| DELETE | `/user/address/:id` | Delete user address | Private |
| GET | `/user` | List all users | Admin |
| GET | `/user/:id` | Get user by ID | Admin |
| PUT | `/user/:id/role` | Change user role | Admin |

### Product Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/products` | Create product | Admin |
| GET | `/products` | List all products | Admin |
| GET | `/products/:id` | Get product by ID | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |
| GET | `/products/search` | Search products | Private |

### Shopping Cart

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/cart` | Add item to cart | Private |
| GET | `/cart` | Get user's cart | Private |
| PUT | `/cart/:id` | Update cart item quantity | Private |
| DELETE | `/cart/:id` | Remove item from cart | Private |

### Order Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/orders` | Create new order | Private |
| GET | `/orders` | Get user's orders | Private |
| GET | `/orders/:id` | Get order details | Private |
| PUT | `/orders/:id/cancel` | Cancel order | Private |
| GET | `/orders/index` | List all orders | Admin |
| GET | `/orders/users/:id` | Get orders by user ID | Admin |
| PUT | `/orders/:id/status` | Update order status | Admin |

## 🗃️ Database Schema

### User Model
- User authentication and profile information
- Role-based access control (ADMIN/USER)
- Multiple addresses support

### Product Model
- Product information with full-text search
- Price, description, tags
- Inventory management

### Cart Model
- Shopping cart functionality
- User-product relationships with quantities

### Order Model
- Order management with status tracking
- Order events for status history
- Order-product relationships

### Address Model
- User address management
- Shipping and billing addresses

## 🔐 Authentication & Authorization

The API uses JWT-based authentication with role-based access control:

- **Public routes**: Registration and login
- **Private routes**: Require valid JWT token
- **Admin routes**: Require admin role

### Middleware Stack
1. **Authentication Middleware**: Validates JWT tokens
2. **Admin Middleware**: Ensures admin role access
3. **Error Middleware**: Centralized error handling

## 🚦 Order Status Management

Orders follow a status workflow:
- `PENDING` - Order placed, awaiting confirmation
- `ACCEPTED` - Order confirmed and processed
- `OUT_FOR_DELIVERY` - Order shipped
- `DELIVERED` - Order completed
- `CANCELLED` - Order cancelled

## 🔍 Search Functionality

The application includes full-text search capabilities for products:
- Search across product names, descriptions, and tags
- MySQL full-text indexing for optimal performance

## 🛡️ Error Handling

Comprehensive error handling with custom exception classes:
- `BadRequestException`
- `NotFoundException`
- `UnauthorizedException`
- `ValidationException`
- `InternalException`

## 🧪 Development

### Scripts
- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm test` - Run tests (to be implemented)

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy
```

## 📦 Dependencies

### Production Dependencies
- `@prisma/client` (^5.16.1) - Database ORM client
- `express` (^4.19.2) - Web framework
- `bcrypt` (^5.1.1) - Password hashing
- `jsonwebtoken` (^9.0.2) - JWT implementation
- `zod` (^3.23.8) - Schema validation
- `dotenv` (^16.4.5) - Environment configuration

### Development Dependencies
- `typescript` (^5.4.5) - TypeScript compiler
- `prisma` (^5.15.0) - Database toolkit
- `nodemon` (^3.1.0) - Development server
- `ts-node` (^10.9.2) - TypeScript execution
- Various type definitions

## 🚀 Deployment

1. **Environment Variables**
   Set up production environment variables including secure DATABASE_URL and JWT_SECRET

2. **Database Migration**
   ```bash
   npx prisma migrate deploy
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Start Production Server**
   ```bash
   npm run start:prod
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, email [your-email@domain.com] or create an issue in the repository.

---

**Note**: This is a backend API server. Make sure to implement proper frontend integration and follow security best practices in production environments.