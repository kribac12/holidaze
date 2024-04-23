import { useEffect } from "react";
import useApi from "@/services/Api";
import { useParams } from "react-router-dom";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
function VenueSpecific() {
  const { venueId } = useParams();
  const { data: venue, isLoading, isError, setUrl } = useApi();

  useEffect(() => {
    if (venueId) {
      setUrl(`https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`);
    }
  }, [venueId, setUrl]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !venue) return <div>Error loading venue details.</div>;

  const bookedDates = venue?.bookings.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
    key: "booked",
  }));
  return (
    <div className="p-4 shadow rounded-lg bg-cardBg">
      {venue.media && <img src={venue.media[0].url} alt={venue.media[0].alt || "Venue image"} className="w-full h-48 object-cover rounded-t-lg" />}
      <div className="p-4">
        <h1 className="text-2xl font-bold">{venue.name}</h1>
        <p>{venue.description}</p>
        <p>Price: ${venue.price} per night</p>
        <p>Max guests: {venue.maxGuests}</p>
      </div>
      <div className="calendar-container">
        <Calendar
          date={new Date()}
          minDate={new Date()}
          showDateDisplay={false}
          ranges={bookedDates}
          rangeColors={["#ff0000"]}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          direction="horizontal"
          preventSnapRefocus={true}
          showMonthAndYearPickers={false}
          disabledDates={bookedDates.map((range) => range.startDate)} // Disable interaction for booked dates
        />
      </div>
    </div>
  );
}

export default VenueSpecific;
