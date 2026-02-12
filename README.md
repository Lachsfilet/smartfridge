# Smart Kühlschrank (Smart Fridge)

A full-stack drink inventory management system built with the [T3 Stack](https://create.t3.gg/). Track your beverages, manage bottle deposits (Pfand), and scan barcodes with your device camera or an external barcode scanner.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Barcode Scanning](#barcode-scanning)
- [Crate Barcode Scanning](#crate-barcode-scanning)
- [Pfand (Deposit) System](#pfand-deposit-system)
- [Development](#development)
- [Deployment](#deployment)

## Features

- **Barcode Scanning** — Scan drink and crate barcodes using device camera or external USB/Bluetooth barcode scanner
- **Drink Inventory** — Track total quantity, opened quantity, and closed quantity for each drink
- **Crate Management** — Register drink crates by barcode; scanning a crate automatically removes one closed bottle and prompts Pfand categorization
- **Pfand (Deposit) Tracking** — Manage three deposit categories (Einweg 25¢, Mehrweg 15¢, Glas 8¢) with real-time value calculation
- **Real-time Updates** — Inventory auto-refreshes every 60 seconds
- **External Scanner Support** — Keyboard-emulating barcode scanners are detected automatically without opening the scanner modal
- **Responsive UI** — Mobile-friendly interface with Tailwind CSS

## Architecture

```
src/
├── app/                        # Next.js App Router
│   ├── _components/            # React UI components
│   │   ├── smartfridge.tsx     # Main application component
│   │   ├── barcode-scanner-modal.tsx  # Camera/manual barcode input
│   │   ├── drink-card.tsx      # Drink display card
│   │   ├── drink-dialog.tsx    # Drink edit dialog
│   │   ├── create-drink-dialog.tsx    # New drink creation
│   │   ├── create-crate-dialog.tsx    # New crate registration
│   │   ├── pfand-card.tsx      # Deposit bottle card
│   │   └── pfand-selection-dialog.tsx # Pfand type selector (post-crate-scan)
│   ├── api/trpc/               # tRPC HTTP handler
│   ├── page.tsx                # Entry point
│   └── layout.tsx              # Root layout
├── server/
│   ├── api/
│   │   ├── routers/drink.ts    # All tRPC procedures (drinks, crates, Pfand)
│   │   ├── root.ts             # Router aggregation
│   │   └── trpc.ts             # tRPC initialization
│   └── db.ts                   # Prisma client singleton
├── models/                     # TypeScript interfaces
│   ├── enums/pfand-type.enum.ts
│   ├── pfand.model.ts
│   └── crate.model.ts
├── styles/                     # Global CSS (Tailwind)
└── trpc/                       # tRPC client configuration
prisma/
├── schema.prisma               # Database schema
├── migrations/                 # SQL migrations
└── seed.ts                     # Sample data seeder
```

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Next.js 15 (App Router, Turbopack)  |
| Language      | TypeScript 5.8                      |
| Frontend      | React 19, Tailwind CSS 4            |
| API           | tRPC 11 (type-safe RPC)             |
| Database      | PostgreSQL with Prisma 6 ORM        |
| Barcode       | react-qr-barcode-scanner            |
| State         | TanStack React Query 5              |
| Validation    | Zod                                 |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL database
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Lachsfilet/smartfridge.git
cd smartfridge

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed sample data
npm run db:seed

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

| Command              | Description                                |
|----------------------|--------------------------------------------|
| `npm run dev`        | Start development server with Turbopack    |
| `npm run build`      | Create production build                    |
| `npm run start`      | Start production server                    |
| `npm run check`      | Run lint + typecheck                       |
| `npm run lint`       | Run ESLint                                 |
| `npm run lint:fix`   | Run ESLint with auto-fix                   |
| `npm run typecheck`  | TypeScript type checking                   |
| `npm run format:check` | Check code formatting (Prettier)         |
| `npm run format:write` | Auto-format code (Prettier)              |
| `npm run db:generate`  | Generate new Prisma migration            |
| `npm run db:migrate`   | Apply database migrations                |
| `npm run db:push`      | Push schema changes (dev only)           |
| `npm run db:seed`      | Seed database with sample data           |
| `npm run db:studio`    | Open Prisma Studio GUI                   |

## Database Schema

### Drink

Represents an individual beverage type tracked by barcode.

| Column         | Type     | Description                        |
|----------------|----------|------------------------------------|
| id             | Int (PK) | Auto-incremented primary key       |
| barcode        | String   | Unique barcode identifier          |
| name           | String   | Display name                       |
| quantity       | Int      | Total number of bottles            |
| openedQuantity | Int      | Number of opened bottles           |
| createdAt      | DateTime | Creation timestamp                 |
| updatedAt      | DateTime | Last update timestamp              |

**Derived value:** `closedQuantity = quantity - openedQuantity`

### Crate

Represents a drink crate mapped to a drink type and a default Pfand category. Scanning a crate barcode removes one closed bottle and prompts the user to add a Pfand bottle.

| Column           | Type      | Description                                  |
|------------------|-----------|----------------------------------------------|
| id               | Int (PK)  | Auto-incremented primary key                 |
| barcode          | String    | Unique crate barcode                         |
| name             | String    | Crate display name (e.g. "Cola-Kasten 20x0.5L") |
| drinkId          | Int (FK)  | References `Drink.id`                        |
| defaultPfandType | PfandType | Suggested Pfand type for this crate          |
| createdAt        | DateTime  | Creation timestamp                           |
| updatedAt        | DateTime  | Last update timestamp                        |

### Pfand

Tracks returnable deposit bottles by category.

| Column    | Type      | Description                            |
|-----------|-----------|----------------------------------------|
| id        | Int (PK)  | Auto-incremented primary key           |
| quantity  | Int       | Number of bottles in this category     |
| pfandType | PfandType | Enum: EINWEG, MEHRWEG, or GLAS         |

### PfandType Enum

| Value   | Display Name         | Deposit Value |
|---------|----------------------|---------------|
| EINWEG  | Einwegleergut 25¢    | €0.25         |
| MEHRWEG | Mehrwegleergut 15¢   | €0.15         |
| GLAS    | Glasflaschen 8¢      | €0.08         |

## API Reference

All endpoints are served via tRPC under the `drink` router namespace.

### Drink Procedures

| Procedure              | Type     | Description                              |
|------------------------|----------|------------------------------------------|
| `drink.getAll`         | Query    | List all drinks ordered by status        |
| `drink.getByBarcode`   | Query    | Find a drink by its barcode              |
| `drink.create`         | Mutation | Create a new drink entry                 |
| `drink.updateBaseData` | Mutation | Update drink name and barcode            |
| `drink.updateQuantity` | Mutation | Update total quantity                    |
| `drink.updateOpenedQuantity` | Mutation | Update opened count               |
| `drink.openDrinks`     | Mutation | Mark bottles as opened and reduce count  |
| `drink.delete`         | Mutation | Delete a drink                           |

### Crate Procedures

| Procedure              | Type     | Description                                          |
|------------------------|----------|------------------------------------------------------|
| `drink.getAllCrates`    | Query    | List all crates with associated drink data           |
| `drink.getCrateByBarcode` | Query | Find a crate by its barcode                          |
| `drink.createCrate`    | Mutation | Register a new crate barcode                         |
| `drink.scanCrate`      | Mutation | Scan a crate: removes one closed bottle from drink   |
| `drink.deleteCrate`    | Mutation | Delete a crate                                       |

### Pfand Procedures

| Procedure           | Type     | Description                              |
|---------------------|----------|------------------------------------------|
| `drink.getPfand`    | Query    | Get all Pfand categories with values     |
| `drink.addPfand`    | Mutation | Increment a Pfand category by 1          |
| `drink.removePfand` | Mutation | Decrement a Pfand category by 1          |
| `drink.updatePfand` | Mutation | Set a Pfand category to a specific count |

## Barcode Scanning

The application supports two barcode input methods:

### Camera Scanner
Open the scanner modal (floating action button) and grant camera access. Supported formats: UPC-A, UPC-E, EAN-8, EAN-13, CODE-39, CODE-93, CODE-128, ITF, CODABAR, RSS-14, RSS-EXPANDED.

### External Barcode Scanner
USB or Bluetooth barcode scanners that emulate keyboard input are automatically detected. Simply scan a barcode from any screen — the system captures rapid keystrokes and processes them on Enter. No modal needed.

### Manual Input
Enter a barcode number manually in the scanner modal's text field.

## Crate Barcode Scanning

Crate barcodes enable a streamlined workflow for tracking individual bottle consumption from drink crates:

### How It Works

1. **Register a Crate** — When scanning an unknown barcode, select "Stattdessen als Kasten registrieren" (Register as Crate) to link the barcode to an existing drink and set a default Pfand type.

2. **Scan a Crate** — When a registered crate barcode is scanned:
   - The system automatically removes one closed bottle from the associated drink inventory
   - A Pfand selection dialog appears with the default type pre-highlighted
   - The user selects the appropriate Pfand category (or skips)
   - The selected Pfand counter is incremented by one

3. **Error Handling** — If no closed bottles remain for the associated drink, the scan is rejected with an error message.

### Example Flow

```
Scan crate barcode "4006040099999"
  → Crate "Cola-Kasten 20x0.5L" found
  → Linked drink "Coca-Cola 500ml" has 5 closed bottles
  → Remove 1 closed bottle → 4 remaining
  → Show Pfand selection (default: Mehrweg 15¢)
  → User selects "Mehrweg 15¢"
  → Mehrweg Pfand count incremented by 1
```

## Pfand (Deposit) System

The German bottle deposit (Pfand) system is fully integrated:

- **Einweg (Single-use)** — €0.25 per bottle (cans, PET bottles)
- **Mehrweg (Reusable)** — €0.15 per bottle (reusable PET/glass)
- **Glas (Glass)** — €0.08 per bottle (beer bottles, etc.)

Each category displays the current count and total value. The overall deposit value is shown in the Leergut (empties) section header.

## Development

### Code Quality

```bash
# Full check (lint + types)
npm run check

# Format code
npm run format:write

# Type checking only
npm run typecheck
```

### Database Management

```bash
# Create a new migration after schema changes
npm run db:generate

# Apply pending migrations
npm run db:migrate

# Push schema directly (development only)
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## Deployment

Follow the T3 Stack deployment guides:

- [Vercel](https://create.t3.gg/en/deployment/vercel)
- [Netlify](https://create.t3.gg/en/deployment/netlify)
- [Docker](https://create.t3.gg/en/deployment/docker)

Set the `DATABASE_URL` environment variable to your PostgreSQL connection string. Use `SKIP_ENV_VALIDATION=1` during Docker builds if needed.
