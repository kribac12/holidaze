import { useEffect } from "react";
import useApi from "@/services/Api";
import { useParams } from "react-router-dom";

function VenueSpecific() {
  const { venueId } = useParams();
  const { data: venue, isLoading, isError, setUrl } = useApi();

  useEffect(() => {
    if (venueId) {
      setUrl(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`);
    }
  }, [venueId, setUrl]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !venue) return <div>Error loading venue details.</div>;

  return (
    <div className="p-4 shadow rounded-lg bg-cardBg">
      {venue.media && <img src={venue.media[0].url} alt={venue.media[0].alt || "Venue image"} className="w-full h-48 object-cover rounded-t-lg" />}
      <div className="p-4">
        <h1 className="text-2xl font-bold">{venue.name}</h1>
        <p>{venue.description}</p>
        <p>Price: ${venue.price} per night</p>
      </div>
    </div>
  );
}

export default VenueSpecific;
