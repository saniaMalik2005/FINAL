export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] text-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#ccff00]" />

        <p className="mt-5 text-sm font-bold tracking-[0.2em] text-gray-400">
          LOADING...
        </p>
      </div>
    </main>
  );
}