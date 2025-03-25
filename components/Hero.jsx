"use client";
import Link from "next/link";
import useLogin from "@/context/LoginContext";

export default function HeroSection() {
  const { setIsLogin } = useLogin();

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-8 ">
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-8">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-blue-950 mb-4">
            Välkommen till Globen Bank
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Välkommen till Globen Bank Hos Globen Bank strävar vi efter att göra
            din ekonomi enkel och trygg. Vi erbjuder innovativa lösningar och
            förstklassig service för både privatpersoner och företag. Oavsett om
            du vill öppna ett konto, göra en överföring eller bara ha någon att
            rådfråga – vi finns här för att hjälpa dig. Vårt mål är att erbjuda
            pålitliga och säkra tjänster, så att du kan fokusera på det som är
            viktigast för dig. Tillsammans bygger vi din finansiella framtid.
          </p>
          <Link
            href="/login-page"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:opacity-80 transition"
            style={{ textDecoration: "none" }}
            onClick={() => setIsLogin(false)}
          >
            Skapa ett konto
          </Link>
        </div>
        <div className="md:w-1/2 w-80">
          <img
            src="/Framsidanbild.jpg"
            alt="Bank bild"
            className="w-full rounded-lg shadow-lg md:block"
          />
        </div>
      </div>
    </section>
  );
}
