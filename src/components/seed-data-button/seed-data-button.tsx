'use client';

import { seed } from '@/db/seed';

export default function SeedDataButton() {
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
