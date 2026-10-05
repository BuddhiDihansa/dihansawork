# Portfolio auto-update + Admin dashboard — Setup

## 1. Supabase (විනාඩි 5)
1. supabase.com → New project.
2. SQL Editor → `supabase/schema.sql` paste කරලා **Run** (එක පාරයි).
3. Authentication → Users → **Add user** (email: dihansabuddhi9@gmail.com + password). 
   Authentication → Sign In / Providers → **Allow new users to sign up = OFF**.
4. Project Settings → API → `Project URL` සහ `anon public key` copy කරන්න.

## 2. Env variables
Local: `.env.example` → `.env` copy කරලා values දාන්න.
Vercel: Project → Settings → Environment Variables එකට වෙනම `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `GEMINI_API_KEY` (chatbot) දාන්න, ඊට පස්සේ Redeploy.

## 3. අලුත් project එකක් add කරන විදිය
- **Automatic:** GitHub repo එකේ About → ⚙ → Topics එකට `portfolio` + (`ai-ml` | `data-science` | `web`) දාන්න. Portfolio එකේ ඉබේම පෙනෙනවා.
- **Manual:** `/admin` → Projects → "+ Add project".

## 4. Dashboard
`yoursite.com/admin` → login. Projects (edit/hide/feature/order), Skills radar, Learning bars, Chatbot bio.

## Notes
- Experience / Education / Journey section තාම code එකේ. ඒවාත් dashboard එකට ගේන්න පුළුවන් (next step).
