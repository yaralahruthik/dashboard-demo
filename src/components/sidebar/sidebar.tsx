export default function Sidebar({ children }: React.PropsWithChildren) {
  return (
    <div className="hidden w-full max-w-xs border-r px-5 lg:block">
      {children}
    </div>
  );
}
