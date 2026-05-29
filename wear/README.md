# SmartFridge Wear OS Companion

Minimal Wear OS 3+ companion for SmartFridge drink inventory management.

## Features

- Circular-friendly, dark UI with compact drink cards
- Real-time inventory sync from `drink.getAll`
- `+` / `-` controls for closed bottle count via `drink.updateQuantity`
- "Mark as Opened" action via `drink.updateOpenedQuantity`
- Optimistic updates with rollback on network failure
- Auto refresh every 60 seconds
- Loading/error states and retry support
- Quick stats for total bottles and estimated Pfand

## Configuration

Base URL is configurable via `SMARTFRIDGE_API_BASE_URL` and defaults to:

- `https://smartfridge-eight.vercel.app`

Set it through Gradle property or environment variable before build.

Examples:

```bash
export SMARTFRIDGE_API_BASE_URL="https://smartfridge-eight.vercel.app"
```

or in `~/.gradle/gradle.properties`:

```properties
SMARTFRIDGE_API_BASE_URL=https://smartfridge-eight.vercel.app
```

## Build & Run

This repository is primarily a Next.js project. The Wear app is added as a standalone Android module under `wear/`.

1. Open `wear/` in Android Studio (or include it in an Android root project).
2. Sync Gradle.
3. Run on a Wear OS 3+ emulator/device.

## Testing

- Verify API connectivity by ensuring drinks appear after launch.
- Use `+`, `-`, and `Mark as Opened`; confirm counts update in SmartFridge backend UI.
- Disable network to verify offline behavior (stale UI + error feedback + retry).
