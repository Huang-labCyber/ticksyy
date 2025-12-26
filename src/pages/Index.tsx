import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConcertCard from "@/components/ConcertCard";
import { Button } from "@/components/ui/button";
import { concerts } from "@/data/concerts";

const Index = () => {
  const featuredConcert = concerts[0];
  const upcomingConcerts = concerts.slice(1, 7);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-16">
        <section className="relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 py-12 md:py-20">
            {/* Hero Text */}
            <div className="text-center mb-10 md:mb-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Platform Tiket Konser #1 di Indonesia</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Beli Tiket Konser
                <br />
                <span className="text-gradient">Tanpa Ribet</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Temukan konser favoritmu dan dapatkan tiket dengan mudah. Pembayaran langsung via QRIS Dana - cepat dan aman.
              </p>
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Link to="/concerts">
                  <Button size="xl">
                    Jelajahi Konser
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Featured Concert */}
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <ConcertCard concert={featuredConcert} featured />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-y border-border/50 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Proses Cepat</h3>
                  <p className="text-sm text-muted-foreground">Beli tiket dalam hitungan menit tanpa perlu registrasi atau login.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Pembayaran Aman</h3>
                  <p className="text-sm text-muted-foreground">Bayar langsung via QRIS Dana dengan proses yang aman dan terenkripsi.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">E-Tiket Instan</h3>
                  <p className="text-sm text-muted-foreground">Dapatkan e-ticket langsung ke email setelah pembayaran dikonfirmasi.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Concerts */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Konser Mendatang
                </h2>
                <p className="text-muted-foreground">Jangan sampai kehabisan tiket!</p>
              </div>
              <Link to="/concerts">
                <Button variant="outline">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingConcerts.map((concert, index) => (
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
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="relative rounded-3xl overflow-hidden gradient-card border border-border/50 p-8 md:p-16 text-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 gradient-glow opacity-50" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Siap Nonton Konser?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Jangan lewatkan kesempatan untuk melihat artis favoritmu secara langsung. Beli tiket sekarang!
                </p>
                <Link to="/concerts">
                  <Button size="xl" variant="glow">
                    Cari Tiket Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
