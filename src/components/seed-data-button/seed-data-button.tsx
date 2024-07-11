'use client';

import { seed } from '@/db/seed';

export default function SeedDataButton() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <button
      onClick={async () => {
        await seed();
      }}
    >
      Seed Data
    </button>
  );
}
