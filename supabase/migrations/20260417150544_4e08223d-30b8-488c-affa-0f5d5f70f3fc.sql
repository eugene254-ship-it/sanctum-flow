create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  token text not null,
  description text not null default '',
  category text not null default 'Music',
  supply bigint not null default 1000000,
  sanctum_score int not null default 50,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Anyone can view projects"
  on public.projects for select
  using (true);

create policy "Anyone can insert projects"
  on public.projects for insert
  with check (true);

create index projects_created_at_idx on public.projects (created_at desc);