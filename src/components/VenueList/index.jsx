import { useEffect } from "react";
import useApi from "@/services/Api";

function VenueList() {
  const { data: venues, isLoading, isError, setUrl } = useApi();

  useEffect(() => {
    setUrl("https://v2.api.noroff.dev/holidaze/venues");
  }, [setUrl]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !venues) return <div>Error loading venues or no venues available.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {venues.map((venue) => (
        <div key={venue.id} className="p-4 shadow rounded-lg bg-cardBg">
          {venue.media && venue.media.length > 0 && (
            <img src={venue.media[0].url} alt={venue.media[0].alt || "Venue image"} className="w-full h-48 object-cover rounded-t-lg" />
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <p>{venue.description}</p>
            <p className="text-sm text-gray-500">Rating: {venue.rating}</p>
            <p className="font-bold">Price per night: ${venue.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VenueList;
