'use client';

import { seed } from '@/db/seed';
import { Button } from '../ui/button';

export default function SeedDataButton() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Button
      onClick={async () => {
        await seed();
      }}
    >
      Seed Data
    </Button>
  );
}
