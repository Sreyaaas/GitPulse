import LoadingSequence from "@/components/shared/LoadingSequence";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSequence />
    </main>
  );
}