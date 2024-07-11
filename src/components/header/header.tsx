import SeedDataButton from '../seed-data-button';
import ThemeToggle from '../theme-toggle';

export default function Header() {
  return (
    <header className="container flex justify-end gap-5 py-2">
      <SeedDataButton />
      <ThemeToggle />
    </header>
  );
}
