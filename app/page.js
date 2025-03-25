import Hero from "@/components/Hero";
import CardSection from "@/components/CardSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CardSection />
    </div>
  );
}
