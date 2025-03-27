"use client"; // Markera filen som en klientkomponent

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Använd next/navigation för klientrouter

export default function Account() {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(""); // Hantera felmeddelanden
  const [success, setSuccess] = useState(""); // Hantera framgångsmeddelanden
  const [otp, setOtp] = useState(""); // Håll reda på OTP-värdet från användaren
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kontrollera om användaren är inloggad

  // När komponenten laddas, kontrollera om OTP finns i localStorage
  useEffect(() => {
    const storedOtp = localStorage.getItem("otp");
    if (storedOtp) {
      setIsLoggedIn(true); // Användaren är redan inloggad
      fetchBalance(storedOtp); // Hämta saldo om användaren är inloggad
    }
  }, []); // Kör bara när komponenten först laddas

  // Funktion för att logga in
  const handleLogin = () => {
    if (otp) {
      localStorage.setItem("otp", otp); // Spara OTP i localStorage
      setIsLoggedIn(true); // Sätt användaren som inloggad
      fetchBalance(otp); // Hämta saldo efter inloggning
      setSuccess("Inloggad framgångsrikt!");
      setOtp(""); // Töm OTP-fältet
    } else {
      setError("Ange ett OTP för att logga in.");
    }
  };

  // Funktion för att hämta saldo
  const fetchBalance = async (otp) => {
    try {
      const response = await fetch("http://localhost:3000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }), // Skickar OTP i body istället för header
      });

      const data = await response.json();
      setBalance(data.amount); // Uppdatera saldo med vad servern returnerar
      setSuccess("Saldo hämtat framgångsrikt!");
    } catch (error) {
      setError("Fel vid hämtning av saldo.");
      console.error("Fel vid hämtning av saldo:", error);
    }
  };

  // Funktion för att logga ut
  const handleLogout = () => {
    localStorage.removeItem("otp"); // Ta bort OTP från localStorage
    setIsLoggedIn(false); // Sätt användaren som utloggad
    setBalance(0); // Återställ saldo
    setSuccess("Utloggad framgångsrikt!");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h2>Logga in för att se ditt saldo</h2>
          <input
            type="text"
            placeholder="Ange OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)} // Uppdatera OTP när användaren skriver
          />
          <button onClick={handleLogin}>Logga in</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h1>Account Balance: {balance}</h1>
          {success && <p style={{ color: "green" }}>{success}</p>}
          <button onClick={handleLogout}>Logga ut</button>
        </div>
      )}
    </div>
  );
}
