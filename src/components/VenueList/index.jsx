import useApi from "@/services/Api";

function VenueList() {
  const { data: venues, isLoading, isError } = useApi("https://v2.api.noroff.dev/holidaze/venues");

  if (isLoading) return <div>Loading...</div>;
  if (isError || !venues) return <div>Error loading venues or no venues available.</div>;

  // Ensure that venues.data exists and is an array before mapping
  if (venues && venues.data && Array.isArray(venues.data)) {
    return (
      <div>
        {venues.data.map((venue) => (
          <div key={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            {venue.media && venue.media.length > 0 && <img src={venue.media[0].url} alt={venue.media[0].alt || "Venue image"} />}
          </div>
        ))}
      </div>
    );
  }

  return <div>No venues found.</div>;
}

export default VenueList;
