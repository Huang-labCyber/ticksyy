import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Concert } from "@/data/concerts";
import { Button } from "./ui/button";

interface ConcertCardProps {
  concert: Concert;
  featured?: boolean;
}

const ConcertCard = ({ concert, featured = false }: ConcertCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const lowestPrice = Math.min(...concert.tickets.map((t) => t.price));
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (featured) {
    return (
      <Link
        to={`/concert/${concert.id}`}
        className="group relative block rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]"
      >
        <div className="absolute inset-0">
          <img
            src={concert.image}
            alt={concert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium gradient-primary text-primary-foreground mb-4">
              Featured Event
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-2 group-hover:text-gradient transition-all">
              {concert.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-4">{concert.artist}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                {formatDate(concert.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {concert.time} WIB
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                {concert.city}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button size="lg" className="group-hover:scale-105 transition-transform">
                Beli Tiket
              </Button>
              <span className="text-sm text-muted-foreground">
                Mulai dari <span className="text-secondary font-semibold">{formatPrice(lowestPrice)}</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/concert/${concert.id}`}
      className="group block rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={concert.image}
          alt={concert.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-primary/90 text-primary-foreground">
            {formatDate(concert.date)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {concert.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{concert.artist}</p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5 text-secondary" />
          <span className="line-clamp-1">{concert.venue}, {concert.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Mulai <span className="text-secondary font-semibold">{formatPrice(lowestPrice)}</span>
          </span>
          <Button size="sm" variant="outline">
            Beli
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ConcertCard;
