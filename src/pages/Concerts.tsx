import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConcertCard from "@/components/ConcertCard";
import { concerts } from "@/data/concerts";

const Concerts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Semua Konser
            </h1>
            <p className="text-muted-foreground">
              Temukan dan beli tiket konser favoritmu
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {concerts.map((concert, index) => (
              <div
                key={concert.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ConcertCard concert={concert} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Concerts;
