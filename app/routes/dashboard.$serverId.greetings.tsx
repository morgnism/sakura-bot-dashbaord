export default function GreetingPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Greeting</h2>
        </div>
        <p className="text-zinc-400">
          Set up welcome messages for new members and goodbye messages for
          leaving members.
        </p>
      </div>
    </div>
  );
}
