export const dynamic = "force-dynamic";

import { Suspense } from "react";

import { Loading } from "@/components/ui/loading";

export default function DestinationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Explore Destinations</h1>
      <Suspense fallback={<Loading />}>
        {/* Destinations content will go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p>Coming soon...</p>
        </div>
      </Suspense>
    </div>
  );
}
