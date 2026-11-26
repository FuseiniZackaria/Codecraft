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
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-brand-orange text-white font-bold text-sm px-2 py-1 rounded font-mono">
              &lt;/&gt;
            </span>
            <span className="font-display font-extrabold text-lg tracking-tight">CODECRAFT</span>
          </div>
          <p className="text-white/55 text-sm">© 2026 CodeCraft · Accra, Ghana</p>
        </div>

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
    </footer>
  );
}
