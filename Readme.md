# Nextjs Fileserver

This is a simple file server built with [Next.js](https://nestjs.com/) for serving static files with authentication.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Node.js

- It is recommended to install Node.js using [Node Version Manager](https://github.com/nvm-sh/nvm)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
nvm install 24
```


### Setup Instructions

1. Copy example `docker-compose.yml` file:
`cp docker-compose.example.yml docker-compose.yml`

2. Generate `JWT_SECRET` and copy it into `docker-compose.yml` file:
`node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`

3. Generate `PASSWORD_HASH` and copy it into `docker-compose.yml`:
```
npm install  # if not run already
node -e "console.log(require('bcryptjs').hashSync('deinpasswort', 10))"
```

**Important**: When copying the password hash into `docker-compose.yml`, replace all `$` characters with `$$` (double dollar signs).

4. Edit the `docker-compose.yml` file and specify the path to the folder containing your static files (HTML, CSS, JavaScript, etc.) that you want to serve.

### Container Management

Build and run the container:
`docker compose up -d --build`

Navigate to `http://localhost:3000/fileserver/` to open the application.

**Note**: The application uses the base path `/fileserver` for all its routes.
To change it go into next.config.js and changed the `basePath` as well es `NEXT_PUBLIC_BASE_PATH` variables.
You can also remove it completely if you don't need it.

Stop the container:
`docker compose down`

Retrieve logs of container:
`docker compose logs -f`

Cleanup all build cache:
`docker builder prune -af`

## Features

- Serves static files from a configured directory
- Password-protected access and secure authentication using JWT tokens
- Easy deployment with Docker
