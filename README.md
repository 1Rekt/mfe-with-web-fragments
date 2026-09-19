run start-all.bat?

# Sales Portal

Angular-based micro-frontends wired together as Web Fragments:

- **Customers** (`mfe_sales_customer`) – customer listing and detail
- **Orders** (`mfe_sales_orders`) – order listing and detail
- **Counter** (`mfe_counter`) – simple counter fragment
- **Shell** (`sales_portal_shell`) – hosts and composes the fragments

## How to Run

Run each service in its own terminal:

### Orders MFE (port 4201)

```bash
cd micro-frontends/mfe_sales_orders
npm install
npm start
```

### Customers MFE (port 4202)

```bash
cd micro-frontends/mfe_sales_customer
npm install
npm start
```

### Counter Fragment (port 3001)

```bash
cd micro-frontends/mfe_counter
npm install
npm start
```

### Shell / Host (port 4200)

```bash
cd sales_portal_shell
npm install
npm start
```

## Access

When all are running, open:

**<http://localhost:4200>**

The shell loads the customers, orders, and counter fragments as web fragments.
