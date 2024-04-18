import VenueList from "@/components/VenueList";
import FeatureSection from "@/components/FeatureSection";

function Home() {
  return (
    <div>
      <section className="mt-section">
        <p>This will be a search form</p>
      </section>
      <section className="mt-section">
        <h1 className="mb-heading text-h1 font-h1">Destinations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <VenueList />
        </div>
      </section>
      <section className="mt-section">
        <FeatureSection />
      </section>
    </div>
  );
}

export default Home;
