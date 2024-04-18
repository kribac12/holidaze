import useApi from "@/services/Api";

function VenueList() {
  const { data: venues, isLoading, isError } = useApi("https://v2.api.noroff.dev/holidaze/venues");

  if (isLoading) return <div>Loading...</div>;
  if (isError || !venues) return <div>Error loading venues or no venues available.</div>;

  // Ensure that venues.data exists and is an array before mapping
  if (venues && venues.data && Array.isArray(venues.data)) {
    return (
      <>
        {venues.data.map((venue) => (
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
      </>
    );
  }

  return <div>No venues found.</div>;
}

export default VenueList;
