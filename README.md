# API Key Management Dashboard

A modern dashboard for managing API keys with features like creation, validation, and usage tracking. Built with Next.js, Tailwind CSS, and Supabase.

## Features

- 🔑 API Key Management (CRUD operations)
- 🌓 Dark/Light Mode
- 📊 Usage Tracking
- ⏰ Expiration Management
- 🔍 Key Validation
- 📱 Responsive Design
- 🔐 Secure Storage with Supabase

## Tech Stack

- Next.js 13+ (App Router)
- Tailwind CSS
- Supabase
- Heroicons
- TypeScript-ready

## Getting Started

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/api-key-dashboard.git
cd api-key-dashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create a `.env.local` file with your Supabase credentials:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The project uses a Supabase database with the following schema:

\`\`\`sql
create table api_keys (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  key text not null unique,
  usage integer default 0,
  monthly_limit integer default 1000,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default now()
);
\`\`\`

## Features in Detail

### API Key Management
- Create new API keys with custom names and limits
- View all active and expired keys
- Edit key names
- Delete keys with confirmation
- Copy keys to clipboard
- Toggle key visibility

### Usage Tracking
- Monitor API usage per key
- Set monthly limits
- Email alerts for usage thresholds
- Visual progress bars for usage limits

### Key Validation
- Validate API keys in real-time
- Check expiration status
- Verify against Supabase database
- Clear success/error feedback

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
