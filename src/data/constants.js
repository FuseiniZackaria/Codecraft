export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Products", href: "/products" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

// Service names are also the options in the contact form, so keep them stable.
// Each service has its own page at /services/<slug>.
export const SERVICES = [
  {
    slug: "business-websites",
    name: "Business Websites",
    summary: "Who you are, what you sell and how to reach you.",
    desc: "A site that says who you are, what you sell and how to reach you, with a WhatsApp button so customers can message you straight from their phone.",
    includes: [
      "The pages your business needs, such as home, about, services and contact",
      "A WhatsApp button and click-to-call on every page",
      "Your location on a map, with directions",
      "A layout that works properly on phones, tablets and laptops",
      "HTTPS, secure hosting and regular backups",
      "Page titles and descriptions set up for Google",
    ],
    goodFor: [
      "Shops, salons, restaurants and other local businesses",
      "Service providers such as consultants, cleaners and mechanics",
      "Schools, churches and organisations that need a public page",
    ],
  },
  {
    slug: "ecommerce-stores",
    name: "E-commerce Stores",
    summary: "Sell your products online and take payment.",
    desc: "An online shop with your products, prices and online payment, and a simple way for you to add and change products yourself.",
    includes: [
      "Product pages with photos, prices and descriptions",
      "A cart and checkout with online payment",
      "A dashboard where you add, edit and remove products yourself",
      "Order notifications, so you know when someone buys",
      "A phone-first layout, since most buyers will shop from a phone",
      "HTTPS, so customers can pay safely",
    ],
    goodFor: [
      "Shops that sell on Instagram or WhatsApp and want a proper store",
      "Businesses selling to customers outside their area",
      "Anyone with more products than fit on a flyer",
    ],
  },
  {
    slug: "portfolio-websites",
    name: "Portfolio Websites",
    summary: "Show your work and let clients contact you.",
    desc: "A clean site that shows your work, your past projects and how to contact you.",
    includes: [
      "A gallery or project pages for your best work",
      "An about section with your background and skills",
      "A contact form and WhatsApp button",
      "Links to your social media",
      "An optional blog, if you want to write",
      "A layout that works on phones and laptops",
    ],
    goodFor: [
      "Photographers, designers and artists",
      "Freelancers and consultants",
      "Professionals applying for jobs or contracts",
    ],
  },
  {
    slug: "landing-pages",
    name: "Landing Pages",
    summary: "One page, one goal: a call, a sign-up or a sale.",
    desc: "One page for one product or campaign, with one clear action: call, sign up or buy.",
    includes: [
      "A single page built around one offer or event",
      "One clear action: call, WhatsApp, sign up or buy",
      "A form that sends sign-ups straight to you",
      "Fast loading, so people arriving from ads don't leave",
      "Click tracking, so you can see how many people tap the button",
      "A phone-first layout",
    ],
    goodFor: [
      "Product launches and promotions",
      "Events, programmes and registrations",
      "Facebook, Instagram or Google ads that need a page to point to",
    ],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    summary: "Fix a site that is slow, dated or hard to use.",
    desc: "Already have a site that is slow or hard to use on a phone? We rebuild it so it loads quickly and works properly.",
    includes: [
      "A review of what isn't working on your current site",
      "A new design that you approve before we build",
      "Faster loading and a proper phone layout",
      "Your existing content moved across and updated where needed",
      "Your domain kept, so your web address doesn't change",
      "HTTPS and backups set up",
    ],
    goodFor: [
      "Sites that look broken or tiny on a phone",
      "Sites that take too long to load",
      "Sites you can no longer update yourself",
    ],
  },
  {
    slug: "seo-optimization",
    name: "SEO Optimization",
    summary: "Help people searching on Google find you.",
    desc: "We set up what Google looks at, such as page titles, descriptions, speed and structure, so people searching for what you sell can find you.",
    includes: [
      "Page titles and descriptions written around what your customers search for",
      "Speed improvements, which Google takes into account",
      "A clean page structure with proper headings",
      "Image descriptions (alt text) on every picture",
    ],
    goodFor: [
      "Businesses with a website that nobody finds",
      "New sites that need a good start on Google",
      "Local businesses that want to show up in nearby searches",
    ],
  },
];

export const INCLUDES = [
  {
    title: "Built for phones first",
    desc: "Most of your customers will visit from a phone, so we design for that screen first.",
  },
  {
    title: "Quick to load",
    desc: "Compressed images and lean code, so pages open quickly even on mobile data.",
  },
  {
    title: "Secure, with backups",
    desc: "HTTPS (the padlock in the browser), secure hosting and regular backups.",
  },
  {
    title: "A clear next step",
    desc: "Every page tells the visitor what to do next: call, send a WhatsApp message or buy.",
  },
];

export const STATS = [
  { val: "100+", label: "Projects delivered" },
  { val: "98%", label: "Client satisfaction" },
  { val: "3x", label: "Average conversion lift" },
  { val: "24h", label: "Response time" },
];

export const PROCESS = [
  {
    num: "01",
    title: "Talk",
    desc: "We talk on WhatsApp or a call about your business, your customers and what the site needs to do.",
  },
  {
    num: "02",
    title: "Design",
    desc: "You see and approve the design before we write any code.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We build it, then test it on phones and laptops in different browsers.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "We put it live, hand everything over to you, and stay available for support after launch.",
  },
];

export const WHATSAPP_URL = "https://wa.me/233202457446";

export const CONTACT_METHODS = [
  { type: "whatsapp", label: "WhatsApp", value: "020 245 7446", href: WHATSAPP_URL },
  { type: "phone", label: "Call or SMS", value: "054 944 0550", href: "tel:+233549440550" },
];
