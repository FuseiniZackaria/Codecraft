import Logo from "./Logo";
import { NAV_LINKS } from "../data/constants";
import { FacebookIcon, InstagramIcon, XIcon, LinkedInIcon, TikTokIcon } from "./Icons";

const SOCIALS = [
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61572096340850", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/justcodecraft/", Icon: InstagramIcon },
  { label: "X (Twitter)", href: "https://twitter.com/CodeCraft", Icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/CodeCraft", Icon: LinkedInIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@justCodeCraft", Icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 mb-6 border-b border-white/10">
          <Logo onDark />
          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-white/15 hover:border-white/50 rounded-md flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-white/55 text-sm">© 2026 CodeCraft GH · Accra, Ghana</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
