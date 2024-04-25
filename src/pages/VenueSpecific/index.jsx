import { useEffect } from "react";
import useApi from "@/services/Api";
import { useParams } from "react-router-dom";
import VenueDetails from "@/components/Venue/VenueDetails";
import VenueMedia from "@/components/Venue/VenueMedia";
import BookingCalendar from "@/components/Venue/BookingCalendar";

function VenueSpecific() {
  const { venueId } = useParams();
  const { data: venue, isLoading, isError, setUrl } = useApi();

  useEffect(() => {
    setUrl(`https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`);
  }, [venueId, setUrl]);

  if (isLoading) return <div className="text-center py-4">Loading venue details...</div>;
  if (isError || !venue) return <div className="text-center text-red-500 py-4">Failed to load venue details. Please try again later.</div>;

  return (
    <div className="p-6 bg-primaryBg shadow-lg rounded-lg">
      <VenueMedia media={venue.media || []} />
      <VenueDetails venue={venue} />
      <BookingCalendar bookings={venue.bookings || []} />
    </div>
  );
}

export default VenueSpecific;
