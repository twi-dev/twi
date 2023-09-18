# Twi

Fanfiction library engine

### Setup

First of all, you'll need [`MySQL`](https://www.mysql.com/) v8, [`Node.js`](https://nodejs.org/) v20 (latest version would be preferrable) and [`docker`](https://www.docker.com/) with [`docker compose`](https://docs.docker.com/compose/) (to run tests).

Before you begin:

1. Create a `.env.development.local` file and fill with required environment variables
2. Create a database with the name you specified in `DB_NANE` variable

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

### Environment variables

| Name        | Required | Default value | Description                                                                                                                  |
|-------------|:--------:|:-------------:|------------------------------------------------------------------------------------------------------------------------------|
| DB_NAME     | Yes      | —             | Database name                                                                                                                |
| DB_HOST     | No       | `"localhost"` | Database server host                                                                                                         |
| DB_PORT     | No       | `3306`        | Database server port                                                                                                         |
| DB_USER     | Yes      | —             | Database user                                                                                                                |
| DB_PASSWORD | Yes      | —             | Database password                                                                                                            |
| AUTH_ORIGIN | Yes      | —             | Server address for auth callbacks. The [`origin`](https://developer.mozilla.org/en-US/docs/Web/API/URL/origin) part of a URL |
| AUTH_SECRET | Yes      | —             | Auth secret for Cookies                                                                                                      |
