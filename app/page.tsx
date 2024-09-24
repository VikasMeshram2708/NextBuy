import ProductCard from "@/components/ProductCard";
import ProductsCarousel from "@/components/ProductsCarousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-16 px-8 space-y-14">
        <ProductsCarousel />
        <ProductCard />
      </main>
    </div>
  );
}
