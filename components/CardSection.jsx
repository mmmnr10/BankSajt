import React from "react";
import Card from "./Card";

export default function CardSection() {
  return (
    <section className="flex justify-center items-center py-16 px-4 md:px-8">
      <div className="flex flex-wrap justify-center items-center gap-8   ">
        <Card
          image="/Bild1.jpg"
          alt="Secure banking"
          title="Säkerhet Först"
          text="Vi erbjuder högsta säkerhet för dina banktransaktioner och sparande."
        />
        <Card
          image="/Bild2.jpg"
          alt="Enkel överföring"
          s
          title="Snabb överföring"
          text="Skicka och ta emot pengar snabbt och effektivt, var du än är."
        />
        <Card
          image="/CustomSupport.jpg"
          alt="Customer support"
          title="Customer Support"
          text="Vårt supportteam är tillgängligt dygnet runt."
        />
      </div>
    </section>
  );
}
