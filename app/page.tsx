import CardGrid from "@/components/card-grid";
import FilterPanel from "@/components/filter-panel";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Suspense>
            <FilterPanel />
          </Suspense>
        </div>
        <div className="lg:col-span-3">
          <Suspense
            fallback={<div className="text-center py-10">Loading cards...</div>}
          >
            <CardGrid />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
