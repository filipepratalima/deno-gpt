# denoGPT
Simple play around with Deno 2.1 &amp; [OpenAI](https://platform.openai.com/docs/overview)

## Environment variables

```bash
cp .env.sample .env
```
Edit the `.env` file with your own `OPENAI_API_KEY`.

## Development

```bash
deno task denoGPT
```

## Production

```bash
deno compile -REN denoGPT.ts
```
