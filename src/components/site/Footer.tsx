import Link from "next/link";
import { CONTACT, LOGO, SOCIAL_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6 lg:px-20 text-gray-300 border-t border-white/10 bg-[#002117]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center space-x-6 pb-12 border-b border-white/10 text-white/80">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label === "WhatsApp" ? "WhatsApp" : undefined}
              className="hover:text-pink-500 transition text-lg"
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          <div className="flex flex-col items-start">
            <img src={LOGO} alt="Aura Logo" className="h-10 mb-2" />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed font-light">
              Elevated rooftop dining above Bassac Lane, showcasing artisanal mixology and charcoal-grilled Kampong Chhnang
              grass-fed Wagyu with Exceptional Services.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Quick Links</h4>
            <ul className="[&>:not([hidden])~:not([hidden])]:mt-3 text-sm font-light">
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition">Our Menu</Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-white transition">Reservations</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition">Events</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Contact Info</h4>
            <ul className="[&>:not([hidden])~:not([hidden])]:mt-3 text-sm font-light text-gray-400">
              <li className="flex items-start space-x-3">
                <i className="fa-solid fa-location-dot mt-1 text-pink-500"></i>
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-phone text-pink-500"></i>
                <span>{CONTACT.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-envelope text-pink-500"></i>
                <span>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Hours of Operation</h4>
            <ul className="[&>:not([hidden])~:not([hidden])]:mt-3 text-sm font-light text-gray-400">
              <li className="flex items-start space-x-3">
                <i className="fa-regular fa-clock mt-1 text-pink-500"></i>
                <div>
                  <p className="text-white font-medium">{CONTACT.hoursDays}</p>
                  <p>{CONTACT.hoursTime}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-light">
          <p>&copy; 2026 Aura Restaurant. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
