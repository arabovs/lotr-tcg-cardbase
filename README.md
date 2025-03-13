# 🧙‍♂️ Lord of the Rings TCG Cardbase

A comprehensive database and interactive interface for the Lord of the Rings Trading Card Game, built with modern web technologies.

## 💫 Personal Note

This project exists because of my profound love for Middle-earth and the incredible world J.R.R. Tolkien created. The stories, characters, and lore have been a constant source of inspiration throughout my life, and this database is my humble contribution to preserving one small corner of that legacy.

## 🌟 Live Demo

Visit the live website: [https://lotr-tcg.netlify.app/](https://lotr-tcg.netlify.app/)

## 🧰 Tech Stack

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="60" height="60" alt="Next.js" title="Next.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" width="60" height="60" alt="Supabase" title="Supabase" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg" width="60" height="60" alt="Netlify" title="Netlify" />
  <img src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-dark.svg" width="200" height="60" alt="Tailwind CSS" title="Tailwind CSS" />
</div>

- **Next.js**: React framework for server-rendered applications
- **Supabase**: Open source Firebase alternative with PostgreSQL database
- **Netlify**: Deployment and hosting platform
- **Tailwind CSS**: Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn package manager
- Supabase account (for database access)

### Environment Setup

Create an `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

you can download the data as csv from here:
[https://lotr-tcg.netlify.com/public/data/Supabase-LOTR-Cards-Data.csv](http://lotr-tcg.netlify.com/public/data/Supabase-LOTR-Cards-Data.csv)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/lotr-tcg-cardbase.git
   cd lotr-tcg-cardbase
   ```

2. Install dependencies

   ```bash
   yarn
   ```

3. Start the development server

   ```bash
   yarn dev
   ```

4. Access the local development site at `http://localhost:3000`

## 🔧 Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the production version
- `yarn start` - Start the production server

## 📚 API Documentation

API documentation is available at [http://localhost:3001/api-docs](http://localhost:3001/api-docs) when running the development server.

## 🧩 Features

- Comprehensive card database with search functionality
- Deck builder with export/import options
- Card galleries with filtering options
- User authentication and saved decks
- Responsive design for mobile and desktop

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 Copyright Disclaimer

This project is provided for informational and educational purposes only. All Lord of the Rings TCG card images, names, descriptions, and related content are the property of their respective copyright holders:

- "The Lord of the Rings" and all related characters, names, and elements are trademarks of The Saul Zaentz Company d/b/a Middle-earth Enterprises under license to New Line Productions, Inc.
- The Lord of the Rings Trading Card Game was created by Decipher, Inc.

This project is not affiliated with, endorsed by, or sponsored by any of the copyright holders. No copyright infringement is intended.

## 🚫 Non-Commercial Use

This database and application are intended for personal, non-commercial use only. Redistribution or use of any content for commercial or resale purposes is strictly prohibited. This project exists to support the fan community and preserve information about the game.

## 💍 Acknowledgements

- The Lord of the Rings TCG community for their continued passion and support
- Decipher, Inc. for creating the original game
- All contributors who have helped maintain card information
- J.R.R. Tolkien for creating the world of Middle-earth
