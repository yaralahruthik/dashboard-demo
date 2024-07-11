import SeedDataButton from '../seed-data-button';
import ThemeToggle from '../theme-toggle';

export default function Header() {
  return (
    <header className="flex justify-end gap-5 px-10 py-2">
      <SeedDataButton />
      <ThemeToggle />
    </header>
  );
}
