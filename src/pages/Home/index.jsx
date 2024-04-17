import VenueList from "@/components/VenueList";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Destinations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <VenueList />
      </div>
    </div>
  );
};

export default Home;
