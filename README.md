This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (Normal Route)

1. Set up the environment variable in .env or .env.local

```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

2.. Install the Dependencies.

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting Started (Docker Route)

1. Build the docker file.

2. Run the docker file with the required environment variable `DATABASE_URL`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Libraries/Systems Used In This Project

- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN for Charts and UI components](https://ui.shadcn.com/docs) and the charts core API itself is from [Recharts](https://recharts.org/en-US/)
- [Forms](https://www.react-hook-form.com/)
- [Dates](https://date-fns.org/)
- [Validations](https://zod.dev/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
