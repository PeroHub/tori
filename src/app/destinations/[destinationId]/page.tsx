import { Metadata } from "next";
import Image from "next/image";

interface PageProps {
  params: {
    destinationId: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `Destination ${params.destinationId}`,
    description: "Destination details",
  };
}

export default function DestinationPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Destination Details</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96">
          <Image
            src="/placeholder-destination.jpg"
            alt="Destination"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Destination Name</h2>
          <p className="text-gray-600 mb-4">
            Detailed description of the destination...
          </p>
        </div>
      </div>
    </div>
  );
}
