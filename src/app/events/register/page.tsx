import { ProtectedRoute } from "@/components/auth/protected-route";
import { EventForm } from "@/components/forms/EventForm";

export default function RegisterEventPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Register New Event</h1>
        <EventForm />
      </div>
    </ProtectedRoute>
  );
}
