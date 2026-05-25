# CodeCraft — React + Tailwind + Supabase

## Project Structure

```
codecraft/
├── public/
│   └── index.html
├── src/
│   ├── admin/
│   │   ├── AdminApp.jsx         ← admin entry point
│   │   ├── AdminLayout.jsx      ← sidebar + layout
│   │   ├── AuthContext.jsx      ← login state
│   │   ├── Login.jsx            ← password login page
│   │   ├── Dashboard.jsx        ← analytics overview
│   │   ├── PortfolioManager.jsx ← add/edit/delete projects
│   │   └── BlogManager.jsx      ← add/edit/delete posts
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx             ← tracks page visits
│   │   ├── Services.jsx
│   │   ├── WhyUs.jsx
│   │   ├── Process.jsx
│   │   ├── CTABanner.jsx        ← tracks button clicks
│   │   ├── Contact.jsx          ← Formspree submissions
│   │   ├── Footer.jsx
│   │   └── Reveal.jsx
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── lib/
│   │   ├── supabase.js          ← Supabase client
│   │   └── analytics.js        ← track visits & clicks
│   ├── data/
│   │   └── constants.js
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── supabase_setup.sql           ← run this in Supabase first!
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Go to https://supabase.com and create a project
2. Open the **SQL Editor** and run the contents of `supabase_setup.sql`
3. Go to **Settings → API** and copy your URL and anon key

### 3. Create `.env` file in project root
```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_FORMSPREE_ID=your-formspree-form-id
```

### 4. Start the app
```bash
npm start
```

## Access the Admin Dashboard
Go to: `http://localhost:3000/admin`
Password: (the one you set)

## Public site
Go to: `http://localhost:3000`
