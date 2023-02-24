export default function Container({ children }: { children: React.ReactNode }) {
  console.log("Hello from container");
  return <div className="max-w-72">{children}</div>;
}
