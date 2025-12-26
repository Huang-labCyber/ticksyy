import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, User, Mail, Phone, ArrowLeft, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CheckoutState {
  concert: {
    id: string;
    title: string;
    artist: string;
    date: string;
    time: string;
    venue: string;
    city: string;
  };
  tickets: {
    ticketId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const state = location.state as CheckoutState | null;

  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [orderNumber, setOrderNumber] = useState("");

  if (!state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Data pesanan tidak ditemukan
          </h1>
          <Button onClick={() => navigate("/")}>Kembali ke Home</Button>
        </div>
      </div>
    );
  }

  const { concert, tickets, total } = state;

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua data",
        variant: "destructive",
      });
      return;
    }
    setStep("payment");
  };

  const handlePaymentConfirm = () => {
    const order = `TKS${Date.now().toString().slice(-8)}`;
    setOrderNumber(order);
    setStep("success");
    toast({
      title: "Pembayaran Berhasil!",
      description: "E-ticket akan dikirim ke email Anda",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Tersalin!",
      description: "Nomor pesanan berhasil disalin",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {step !== "success" && (
            <Button
              variant="ghost"
              onClick={() => step === "form" ? navigate(-1) : setStep("form")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          )}

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {["Data Diri", "Pembayaran", "Selesai"].map((label, index) => {
              const stepIndex = index;
              const currentStepIndex = step === "form" ? 0 : step === "payment" ? 1 : 2;
              const isActive = stepIndex === currentStepIndex;
              const isCompleted = stepIndex < currentStepIndex;

              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      isActive
                        ? "gradient-primary text-primary-foreground shadow-glow-primary"
                        : isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>
                  <span
                    className={`hidden sm:block text-sm ${
                      isActive ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  {index < 2 && (
                    <div className={`w-8 sm:w-16 h-0.5 ${isCompleted ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === "form" && (
                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                    Data Pemesan
                  </h2>
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-primary" />
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email aktif"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        E-ticket akan dikirim ke email ini
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-primary" />
                        Nomor WhatsApp
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Contoh: 08123456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full mt-6">
                      Lanjut ke Pembayaran
                    </Button>
                  </form>
                </div>
              )}

              {step === "payment" && (
                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                    Pembayaran QRIS Dana
                  </h2>

                  <div className="text-center">
                    <div className="inline-block bg-background rounded-2xl p-6 border border-border/50 mb-6">
                      {/* QRIS Placeholder */}
                      <div className="w-64 h-64 bg-foreground rounded-xl flex items-center justify-center mx-auto mb-4">
                        <div className="text-center p-4">
                          <div className="w-48 h-48 bg-background rounded-lg flex items-center justify-center">
                            <div className="grid grid-cols-5 gap-1">
                              {Array.from({ length: 25 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-6 h-6 ${
                                    Math.random() > 0.3 ? "bg-foreground" : "bg-background"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <Img src="qris.jpg" alt=" " />
                        Scan QR Code dengan aplikasi Dana
                      </p>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4 mb-6">
                      <p className="text-sm text-muted-foreground mb-2">Total Pembayaran</p>
                      <p className="text-3xl font-display font-bold text-gradient">
                        {formatPrice(total)}
                      </p>
                    </div>

                    <div className="text-left bg-muted/30 rounded-xl p-4 mb-6">
                      <h4 className="font-semibold text-foreground mb-2">Cara Pembayaran:</h4>
                      <ol className="text-sm text-muted-foreground space-y-2">
                        <li>1. Buka aplikasi Dana di smartphone Anda</li>
                        <li>2. Pilih menu "Scan" atau "Bayar"</li>
                        <li>3. Scan QR Code di atas</li>
                        <li>4. Konfirmasi pembayaran di aplikasi Dana</li>
                        <li>5. Klik tombol "Konfirmasi Pembayaran" di bawah</li>
                      </ol>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open("https://www.dana.id/", "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Buka Dana
                      </Button>
                      <Button size="lg" className="flex-1" onClick={handlePaymentConfirm}>
                        Konfirmasi Pembayaran
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="bg-card rounded-xl border border-border/50 p-8 text-center">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
                    <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
                  </div>

                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Pembayaran Berhasil!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Terima kasih telah membeli tiket di Ticksy
                  </p>

                  <div className="bg-muted/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Nomor Pesanan</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl font-display font-bold text-foreground">
                        {orderNumber}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(orderNumber)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-secondary">
                      E-ticket telah dikirim ke <strong>{formData.email}</strong>
                    </p>
                  </div>

                  <Button size="lg" onClick={() => navigate("/")}>
                    Kembali ke Home
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Detail Pesanan
                </h3>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-1">{concert.title}</h4>
                  <p className="text-sm text-muted-foreground">{concert.artist}</p>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{formatDate(concert.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{concert.time} WIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{concert.venue}</span>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4 space-y-2 mb-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.ticketId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {ticket.name} x{ticket.quantity}
                      </span>
                      <span className="text-foreground">
                        {formatPrice(ticket.price * ticket.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/50 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-gradient">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
