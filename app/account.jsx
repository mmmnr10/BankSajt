import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Account() {
  const [balance, setBalance] = useState(0);
  const [otp, setOtp] = useState("");
  const [amount, setAmount] = useState(0); // Amount for deposit or transfer
  const [recipient, setRecipient] = useState(""); // Recipient's account or username
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Fetch the OTP from localStorage and set it when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOtp = localStorage.getItem("otp") || "";
      console.log("storedOtp", storedOtp);
      setOtp(storedOtp);
    }
  }, []);

  // Fetch balance from the server when OTP is available
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          "http://ec2-51-20-85-218.eu-north-1.compute.amazonaws.com:3001/me/accounts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: otp }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBalance(data.saldo); // Set the balance from the server response
      } catch (error) {
        console.error("Error:", error);
        alert("Ett fel inträffade vid hämtning av saldo.");
      }
    };

    if (otp) {
      fetchBalance();
    }
  }, [otp]);

  // Handle depositing money
  const handleDeposit = async () => {
    try {
      const response = await fetch(
        "http://ec2-51-20-85-218.eu-north-1.compute.amazonaws.com:3001/me/accounts/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: otp, amount: parseFloat(amount) }),
        }
      );

      if (!response.ok) {
        console.error("Response status:", response.status);
        console.error("Response message:", response.statusText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setBalance(data.saldo); // Update balance after deposit
      setSuccess("Pengar insatta!");
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("Ett fel inträffade vid insättning av pengar.");
      setSuccess("");
    }
  };

  // Handle transferring money to another user
  const handleTransfer = async () => {
    if (!recipient || !amount) {
      setError("Ange både mottagare och belopp.");
      return;
    }

    try {
      const response = await fetch(
        "http://ec2-51-20-85-218.eu-north-1.compute.amazonaws.com:3001/me/accounts/transfer", // Assuming there's an endpoint for transfers
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: otp,
            recipient: recipient,
            amount: parseFloat(amount),
          }),
        }
      );

      if (!response.ok) {
        console.error("Response status:", response.status);
        console.error("Response message:", response.statusText);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setBalance(data.saldo); // Update balance after transfer
      setSuccess("Överföring lyckades!");
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("Ett fel inträffade vid överföring av pengar.");
      setSuccess("");
    }
  };

  // Handle logout and clear OTP from localStorage
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("otp");
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="w-full bg-white p-4 text-black flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <Image src="/bild1.jpg" alt="Logo" width={120} height={120} />
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logga ut
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Ditt Konto</h1>
          <div className="text-center mb-4">
            <p className="text-xl font-semibold">Saldo: {balance} SEK</p>
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mb-4 text-center">{success}</p>
          )}

          {/* OTP Input */}
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              123456 (OTP)
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Ange OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Deposit Input */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Belopp att sätta in (SEK)
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Belopp"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleDeposit}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sätt in pengar
          </button>

          {/* Transfer Section */}
          <div className="mb-4 mt-8">
            <label
              htmlFor="recipient"
              className="block text-sm font-medium text-gray-700"
            >
              Mottagare (Användarnamn eller Konto ID)
            </label>
            <input
              type="text"
              id="recipient"
              placeholder="Ange mottagarens användarnamn"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleTransfer}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Överför pengar
          </button>
        </div>
      </div>
    </div>
  );
}
