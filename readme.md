# Twi

Fanfiction library engine

## Setup

First of all, you'll need [`MySQL`](https://www.mysql.com/) v8, [`Node.js`](https://nodejs.org/) v20 (latest version would be preferrable) and [`docker`](https://www.docker.com/) with [`docker compose`](https://docs.docker.com/compose/) (to run tests).

Then, make sure to install the dependencies:

```bash
pnpm i
```

## Development Server

Start the development server on [`http://localhost:3000`](http://localhost:3000):

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```
