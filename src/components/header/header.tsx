import SeedDataButton from '../seed-data-button';
import ThemeToggle from '../theme-toggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-5 px-10 py-2">
      <div className="flex flex-col">
        <span className="text-2xl font-medium">Service Automator</span>
        <span className="text-sm font-bold text-muted-foreground">
          Powered By Enrichbiz A.I
        </span>
      </div>
      <div className="flex items-center gap-5">
        <SeedDataButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
