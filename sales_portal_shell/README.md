# Sales Portal Shell

Angular 19 application with lazy-loaded modules for Orders and Customers management.

## Features

- Header and left side navigation
- Lazy-loaded Orders module with list and detail views
- Lazy-loaded Customers module with list and detail views
- Mock data services using JSON files
- Clean, standard Angular structure

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200`

### Build

```bash
npm run build
```

## Routes

- `/order/order-list` - List of all orders
- `/order/:orderId/detail` - Order detail view
- `/customer/customer-list` - List of all customers
- `/customer/:customerId/detail` - Customer detail view

## Project Structure

```
src/
├── app/
│   ├── orders/              # Orders module
│   │   ├── order-list/
│   │   ├── order-detail/
│   │   ├── models/
│   │   ├── services/
│   │   └── orders.routes.ts
│   ├── customers/           # Customers module
│   │   ├── customer-list/
│   │   ├── customer-detail/
│   │   ├── models/
│   │   ├── services/
│   │   └── customers.routes.ts
│   ├── app.component.*
│   ├── app.config.ts
│   └── app.routes.ts
└── assets/                  # Shell assets (shared shell resources)

Mock data files are now owned by each micro-frontend:
- `micro-frontends/mfe_customers/src/assets/data/customers.json`
- `micro-frontends/mfe_orders/src/assets/data/orders.json`
```

