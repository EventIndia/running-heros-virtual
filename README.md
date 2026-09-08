# Running Heros Virtual

Standalone frontend for Virtual Running Heros.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_API_URL` to the Running Heros API base URL.
4. Set `API_SERVER_SECRET` in the deployment environment if the API requires `X-Server-Secret`.
5. Run `npm run dev`.

## Notes

- This repo contains only the virtual frontend page.
- Event cards and hero slides fetch virtual events from the existing Running Heros API.
- Register links open the main Running Heros event detail page by default through `NEXT_PUBLIC_MAIN_SITE_URL`.
