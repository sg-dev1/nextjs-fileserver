# Nextjs Fileserver

This is a simple file server built using nextjs.

## Getting Started

### Preparae Docker Compose File

Copy example docker compose file:
`cp docker-compose.example.yml docker-compose.yml`

Generate JWT_SECRET and copy it into docker-compose file:
`node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`

Generate PASSWORD_HASH and copy it into docker-compose file replacing $ with $$ signs:
```
npm install  # if not run already
node -e "console.log(require('bcryptjs').hashSync('deinpasswort', 10))"
```

### Operating the Container

Build and run the container:
`docker compose up -d --build`

Stop the container:
`docker compose down`

Retrieve logs of container:
`docker compose logs -f`

Cleanup all build cache:
`docker builder prune -af`
