"use client";
import Link from "next/link";
import {
  Phone,
  Mail,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-rust/10">

      <div className="max-w-[1600px] mx-auto px-5 lg:px-10">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link href="/">
  <img
    src="images/logo.svg"
    alt="Nomichi"
    className="h-8 w-auto object-contain"
  />
</Link>
          

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-10">

            <a
              href="#stories"
              className="text-ink font-medium hover:text-rust transition"
            >
              Stories Across India
            </a>


            <a
              href="#wonders"
              className="text-ink font-medium hover:text-rust transition"
            >
              Lesser Known Wonders
            </a>


          </nav>

          {/* Contact Button */}

          <div className="flex items-center gap-4">

  <Link
    href="/login"
    className="
      text-ink
      font-medium
      hover:text-rust
      transition
    "
  >
    Admin Login
  </Link>

  <a
    href="#contact"
    className="
      bg-rust
      text-white
      px-6
      py-3
      rounded-full
      font-semibold
      hover:scale-105
      transition-all
    "
  >
    Contact Us
  </a>

</div>

        </div>

      </div>

    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#07142c] text-white">

      <div className="max-w-[1600px] mx-auto px-5 lg:px-10 py-20">

        {/* Top Footer */}

        <div className="grid md:grid-cols-3 gap-16">

          {/* Quick Links */}

          <div>

            <h3 className="text-rust text-2xl font-bold mb-8">
              Quick Links
            </h3>

            <div className="space-y-5">

              <a href="#stories" className="block hover:text-rust">
                Stories Across India
              </a>


              <a href="#wonders" className="block hover:text-rust">
                Lesser Known Wonders
              </a>

              <a href="#reviews" className="block hover:text-rust">
                Reviews
              </a>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-rust text-2xl font-bold mb-8">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                hello@thenomichi.com
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                +91 7000962406
              </div>

            </div>

            <a
              href="#contact"
              className="
                inline-block
                mt-8
                bg-rust
                px-8
                py-4
                rounded-full
                font-semibold
              "
            >
              GET IN TOUCH
            </a>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-rust text-2xl font-bold mb-8">
              Follow Us
            </h3>

            <p className="text-white/70 mb-8">
              Join our community and stay updated with our latest
              adventures and travel stories.
            </p>

            <div className="space-y-4">

              <a
                href="https://www.instagram.com/thenomichi/"
                className="flex items-center gap-3 hover:text-rust"
              >
                <FaInstagram size={18} />
                Instagram
              </a>

              <a
                href="https://www.facebook.com/p/Nomichi-61576720485638/"
                className="flex items-center gap-3 hover:text-rust"
              >
                <FaFacebook size={18} />
                Facebook
              </a>

              <a
                href="https://www.linkedin.com/company/thenomichi"
                className="flex items-center gap-3 hover:text-rust"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </a>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="h-px bg-white/10 my-16" />

        {/* Bottom Footer */}

        <div className="text-center">

          <Link href="/">
  <img
    src="images/logo.svg"
    alt="Nomichi"
    className="h-12 w-auto mx-auto mb-6"
  />
</Link>

          <h2 className="text-3xl md:text-5xl font-black">
            NOMICHI EXPLORERS PRIVATE LIMITED
          </h2>

          <p className="mt-6 text-white/70">
            1159 BI Shashwat Villa, Hawa Bagh Road,
            Napier Town, Jabalpur
          </p>

          <p className="mt-2 text-white/70">
            Madhya Pradesh, India - 482001
          </p>

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-5
              mt-10
              text-white/80
            "
          >
            <span>hello@thenomichi.com</span>
            <span>|</span>
            <span>+91 7000962406</span>
            <span>|</span>
            <span>www.thenomichi.com</span>
          </div>

          <div className="flex justify-center gap-5 mt-10">

  <a
    href="https://www.facebook.com/p/Nomichi-61576720485638/"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-social"
  >
    <FaFacebook size={20} />
  </a>

  <a
    href="https://www.instagram.com/thenomichi/"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-social"
  >
    <FaInstagram size={20} />
  </a>

  <a
    href="https://www.linkedin.com/company/thenomichi"
    target="_blank"
    rel="noopener noreferrer"
    className="footer-social"
  >
    <FaLinkedin size={20} />
  </a>

</div>

          <p className="mt-10 text-white/50 text-sm">
            © {new Date().getFullYear()} Nomichi. Wander. Connect. Belong.
          </p>

        </div>

      </div>

    </footer>
  );
  }