import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, Minus, Plus, ArrowLeft, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getConcertById, TicketType } from "@/data/concerts";

const ConcertDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const concert = getConcertById(id || "");

  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

  if (!concert) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Konser tidak ditemukan
          </h1>
          <Button onClick={() => navigate("/")}>Kembali ke Home</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (ticketId: string, delta: number, max: number) => {
    setSelectedTickets((prev) => {
      const current = prev[ticketId] || 0;
      const newValue = Math.max(0, Math.min(max, current + delta));
      if (newValue === 0) {
        const { [ticketId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [ticketId]: newValue };
    });
  };

  const totalItems = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(selectedTickets).reduce((total, [ticketId, qty]) => {
    const ticket = concert.tickets.find((t) => t.id === ticketId);
    return total + (ticket?.price || 0) * qty;
  }, 0);

  const handleCheckout = () => {
    if (totalItems === 0) return;
    
    const ticketData = Object.entries(selectedTickets).map(([ticketId, qty]) => {
      const ticket = concert.tickets.find((t) => t.id === ticketId);
      return {
        ticketId,
        name: ticket?.name,
        price: ticket?.price,
        quantity: qty,
      };
    });

    navigate("/checkout", {
      state: {
        concert: {
          id: concert.id,
          title: concert.title,
          artist: concert.artist,
          date: concert.date,
          time: concert.time,
          venue: concert.venue,
          city: concert.city,
        },
        tickets: ticketData,
        total: totalPrice,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={concert.image}
            alt={concert.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Concert Info */}
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium gradient-primary text-primary-foreground mb-4">
                {formatDate(concert.date)}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
                {concert.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{concert.artist}</p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{formatDate(concert.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{concert.time} WIB</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{concert.venue}, {concert.city}</span>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border/50 p-6 mb-8">
                <h3 className="font-display font-semibold text-foreground mb-3">Tentang Event</h3>
                <p className="text-muted-foreground">{concert.description}</p>
              </div>

              {/* Ticket Selection */}
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                  Pilih Tiket
                </h3>
                <div className="space-y-4">
                  {concert.tickets.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      quantity={selectedTickets[ticket.id] || 0}
                      onUpdateQuantity={(delta) =>
                        updateQuantity(ticket.id, delta, Math.min(4, ticket.available))
                      }
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Ringkasan Pesanan
                </h3>

                {totalItems === 0 ? (
                  <div className="text-center py-8">
                    <Info className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      Pilih tiket untuk melanjutkan
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {Object.entries(selectedTickets).map(([ticketId, qty]) => {
                        const ticket = concert.tickets.find((t) => t.id === ticketId);
                        if (!ticket) return null;
                        return (
                          <div key={ticketId} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {ticket.name} x{qty}
                            </span>
                            <span className="text-foreground">
                              {formatPrice(ticket.price * qty)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-border/50 pt-4 mb-6">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-gradient">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleCheckout}
                    >
                      Lanjut ke Pembayaran
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Pembayaran via QRIS Dana
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface TicketCardProps {
  ticket: TicketType;
  quantity: number;
  onUpdateQuantity: (delta: number) => void;
  formatPrice: (price: number) => string;
}

const TicketCard = ({ ticket, quantity, onUpdateQuantity, formatPrice }: TicketCardProps) => {
  const isSelected = quantity > 0;

  return (
    <div
      className={`bg-card rounded-xl border p-5 transition-all duration-300 ${
        isSelected
          ? "border-primary shadow-glow-primary/20"
          : "border-border/50 hover:border-border"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-display font-semibold text-foreground">{ticket.name}</h4>
            {ticket.available < 50 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive">
                Tersisa {ticket.available}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
          <p className="text-lg font-bold text-secondary">{formatPrice(ticket.price)}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(-1)}
            disabled={quantity === 0}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdateQuantity(1)}
            disabled={quantity >= Math.min(4, ticket.available)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConcertDetail;
