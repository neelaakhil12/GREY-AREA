-- ====================================================================
-- GREY AREA MEDIA AGENCY - SUPABASE DATABASE SCHEMA
-- Execute this SQL script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/moofrnuptxblogvfweac/sql/new
-- ====================================================================

-- 1. Create Gallery Items Table (Photos & Videos Portfolio)
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id TEXT PRIMARY KEY DEFAULT concat('g_', extract(epoch from now())::bigint),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Photos',
    media_type TEXT DEFAULT 'image',
    image_url TEXT NOT NULL,
    video_url TEXT DEFAULT '',
    description TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id TEXT PRIMARY KEY DEFAULT concat('sub_', extract(epoch from now())::bigint),
    email TEXT UNIQUE NOT NULL,
    name TEXT DEFAULT 'Valued Subscriber',
    source TEXT DEFAULT 'Website CTA',
    status TEXT DEFAULT 'Active',
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 4. Create Security Access Policies for Public & Admin

-- Gallery Items Access Policies
DROP POLICY IF EXISTS "Allow public read access to gallery items" ON public.gallery_items;
CREATE POLICY "Allow public read access to gallery items"
    ON public.gallery_items FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow anonymous insert access to gallery items" ON public.gallery_items;
CREATE POLICY "Allow anonymous insert access to gallery items"
    ON public.gallery_items FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous update access to gallery items" ON public.gallery_items;
CREATE POLICY "Allow anonymous update access to gallery items"
    ON public.gallery_items FOR UPDATE
    USING (true);

DROP POLICY IF EXISTS "Allow anonymous delete access to gallery items" ON public.gallery_items;
CREATE POLICY "Allow anonymous delete access to gallery items"
    ON public.gallery_items FOR DELETE
    USING (true);

-- Newsletter Subscribers Access Policies
DROP POLICY IF EXISTS "Allow public read access to newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow public read access to newsletter subscribers"
    ON public.newsletter_subscribers FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow anonymous insert access to newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow anonymous insert access to newsletter subscribers"
    ON public.newsletter_subscribers FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous delete access to newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow anonymous delete access to newsletter subscribers"
    ON public.newsletter_subscribers FOR DELETE
    USING (true);

-- ====================================================================
-- Initial Default Gallery Data Seed (Photos & Videos)
-- ====================================================================
INSERT INTO public.gallery_items (id, title, category, media_type, image_url, video_url, description)
VALUES 
    ('g1', 'Brand Story: Elevate Tech Nigeria', 'Brand Videos', 'video', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80', 'https://res.cloudinary.com/demo/video/upload/elephants.mp4', 'Cinematic commercial highlighting tech startup journey and digital transformation in Lagos.'),
    ('g2', 'National Business Leadership Summit', 'Corporate', 'image', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', '', 'Comprehensive corporate event coverage with multicam video production and keynotes.'),
    ('g3', 'Afro-Creative Fashion Showcase', 'Events', 'image', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', '', 'High-energy event recap featuring runway highlights and sound design.'),
    ('g4', 'Luxury Watch Commercial Shoot', 'Product Shoots', 'image', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', '', 'Macro studio photography and slow-motion video highlight for luxury wristwear.')
ON CONFLICT (id) DO NOTHING;
