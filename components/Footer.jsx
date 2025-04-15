import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontakta Oss</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-2xl" />
                Adress: Stora Gatan 12, 123 45 Stockholm
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-2xl" />
                Telefon: +46 22 412 442
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-2xl" />
                Email: contact@Globenbank.com
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Snabblänkar</h3>
            <ul className="space-y-4 text-lg">
              <li>
                <Link href="/" className="hover:underline">
                  Hem
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Konto
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Överföring
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Följ oss</h3>
            <div className="flex space-x-6 text-2xl">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="hover:text-blue-600 transition" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="hover:text-blue-400 transition" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:text-blue-700 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Globen Bank. Alla rättigheter
            reserverade.
          </p>
          <div className="mt-2">
            <Link href="/" className="text-sm hover:underline">
              Integritetspolicy
            </Link>{" "}
            |
            <Link href="/" className="text-sm hover:underline">
              Användarvillkor
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
