-- Run this once in Supabase -> SQL Editor.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  repo text unique,                -- GitHub repo name (null = manually added project)
  title text, category text, description text,
  tech text[] not null default '{}', link text,
  hidden boolean not null default false,
  featured boolean not null default false,
  sort int,
  created_at timestamptz not null default now()
);
create table if not exists public.site_content (
  key text primary key,            -- 'learning' | 'radar' | 'bio'
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.site_content enable row level security;

create policy "public read projects" on public.projects for select using (true);
create policy "public read content" on public.site_content for select using (true);
create policy "admin write projects" on public.projects for all to authenticated
  using ((auth.jwt() ->> 'email') = 'dihansabuddhi9@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'dihansabuddhi9@gmail.com');
create policy "admin write content" on public.site_content for all to authenticated
  using ((auth.jwt() ->> 'email') = 'dihansabuddhi9@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'dihansabuddhi9@gmail.com');

-- Seed: your current 6 projects (run once)
insert into public.projects (title, category, description, tech, link, sort) values
 ('YouTube Analytics Dashboard','Data Science','Interactive dashboard analyzing channel performance with Streamlit, Plotly & Pandas.','{Streamlit,Plotly,Pandas}','https://github.com/BuddhiDihansa',10),
 ('Customer Churn Prediction','AI / ML','End-to-end ML pipeline with SHAP explainability deployed via Streamlit.','{scikit-learn,SHAP,Streamlit}','https://github.com/BuddhiDihansa',20),
 ('Clinical Data Analysis in R','Data Science','Statistical exploration of the MSK-CHORD dataset for clinical insights.','{R,ggplot2,Stats}','https://github.com/BuddhiDihansa',30),
 ('AI Companion Robot','AI / ML','Experimental project exploring conversational AI and embedded interaction.','{Python,LLM,IoT}','https://github.com/BuddhiDihansa',40),
 ('Lanka Explores','Web','Web project showcasing Sri Lankan travel destinations with a modern UI.','{HTML,CSS,PHP}','https://github.com/BuddhiDihansa',50),
 ('PetWorld','Web','Group web project — a community platform for pet lovers and adopters.','{HTML,CSS,JS}','https://github.com/BuddhiDihansa',60);
