export interface Concert {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  description: string;
  tickets: TicketType[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}

export const concerts: Concert[] = [
  {
    id: "1",
    title: "RAISA Live in Concert",
    artist: "Raisa Andriana",
    date: "2025-02-14",
    time: "19:00",
    venue: "Indonesia Convention Exhibition (ICE)",
    city: "BSD City, Tangerang",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
    description: "Saksikan penampilan memukau Raisa dalam konser Valentine spesial dengan setlist lagu-lagu hits terbaik.",
    tickets: [
      { id: "t1", name: "Festival", price: 350000, description: "Area berdiri, akses masuk biasa", available: 500 },
      { id: "t2", name: "Tribune", price: 750000, description: "Tempat duduk tribun dengan view bagus", available: 300 },
      { id: "t3", name: "VIP", price: 1500000, description: "Tempat duduk premium, merchandise eksklusif", available: 100 },
      { id: "t4", name: "VVIP", price: 2500000, description: "Front row, meet & greet, merchandise eksklusif", available: 50 },
    ],
  },
  {
    id: "2",
    title: "TULUS - Manusia Tour",
    artist: "Tulus",
    date: "2025-03-08",
    time: "20:00",
    venue: "Gelora Bung Karno",
    city: "Jakarta",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    description: "Tur konser nasional Tulus dengan album terbaru 'Manusia'. Pengalaman musikal yang tak terlupakan.",
    tickets: [
      { id: "t5", name: "CAT 3", price: 450000, description: "Area berdiri tribun atas", available: 1000 },
      { id: "t6", name: "CAT 2", price: 850000, description: "Tribun tengah dengan view optimal", available: 600 },
      { id: "t7", name: "CAT 1", price: 1200000, description: "Tribun bawah dekat panggung", available: 400 },
      { id: "t8", name: "Platinum", price: 2000000, description: "Golden circle area", available: 150 },
    ],
  },
  {
    id: "3",
    title: "BERNADYA - Itu Saja Tour",
    artist: "Bernadya",
    date: "2025-04-12",
    time: "19:30",
    venue: "Tennis Indoor Senayan",
    city: "Jakarta",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    description: "Konser perdana Bernadya dengan lagu-lagu hits seperti 'Untungnya, Hidup Harus Tetap Berjalan' dan 'Apa Mungkin'.",
    tickets: [
      { id: "t9", name: "Silver", price: 400000, description: "Tribun atas", available: 800 },
      { id: "t10", name: "Gold", price: 750000, description: "Tribun tengah", available: 500 },
      { id: "t11", name: "Diamond", price: 1350000, description: "Area premium dekat panggung", available: 200 },
    ],
  },
  {
    id: "4",
    title: "COLDPLAY - Music of the Spheres",
    artist: "Coldplay",
    date: "2025-05-20",
    time: "19:00",
    venue: "Gelora Bung Karno Stadium",
    city: "Jakarta",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    description: "Konser spektakuler Coldplay dengan visual memukau dan pengalaman immersive yang luar biasa.",
    tickets: [
      { id: "t12", name: "Festival A", price: 1500000, description: "Standing area zona A", available: 2000 },
      { id: "t13", name: "Festival B", price: 1200000, description: "Standing area zona B", available: 3000 },
      { id: "t14", name: "CAT 2", price: 2500000, description: "Seated tribun tengah", available: 1500 },
      { id: "t15", name: "CAT 1", price: 3500000, description: "Seated tribun bawah", available: 800 },
      { id: "t16", name: "Infinity", price: 5000000, description: "Premium experience package", available: 200 },
    ],
  },
  {
    id: "5",
    title: "NADIN AMIZAH - Selamat Ulang Tahun",
    artist: "Nadin Amizah",
    date: "2025-03-25",
    time: "19:00",
    venue: "The Kasablanka Hall",
    city: "Jakarta",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
    description: "Rayakan momen spesial bersama Nadin Amizah dalam konser intimate dengan suasana hangat.",
    tickets: [
      { id: "t17", name: "Regular", price: 350000, description: "General admission", available: 400 },
      { id: "t18", name: "Premium", price: 650000, description: "Seated area dengan view lebih baik", available: 250 },
      { id: "t19", name: "VIP", price: 1100000, description: "Front area + merchandise bundle", available: 100 },
    ],
  },
  {
    id: "6",
    title: "WEIRD GENIUS - Big Bang Tour",
    artist: "Weird Genius",
    date: "2025-04-05",
    time: "21:00",
    venue: "Beach City International Stadium",
    city: "Ancol, Jakarta",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80",
    description: "Festival musik EDM terbesar dengan Weird Genius sebagai headline. Siap bergoyang sepanjang malam!",
    tickets: [
      { id: "t20", name: "Early Bird", price: 250000, description: "General admission (terbatas)", available: 100 },
      { id: "t21", name: "Presale", price: 350000, description: "General admission", available: 1500 },
      { id: "t22", name: "VIP Lounge", price: 800000, description: "Akses VIP area + free drinks", available: 200 },
    ],
  },
];

export const getConcertById = (id: string): Concert | undefined => {
  return concerts.find((concert) => concert.id === id);
};
