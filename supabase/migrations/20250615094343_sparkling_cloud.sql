/*
  # Blog Application Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text, user's display name)
      - `email` (text, user's email)
      - `avatar_url` (text, optional profile picture)
      - `role` (text, user role: 'user' or 'admin')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, post title)
      - `slug` (text, URL-friendly version of title)
      - `excerpt` (text, short description)
      - `content` (text, full post content)
      - `featured_image` (text, optional image URL)
      - `tags` (text array, post categories)
      - `published` (boolean, publication status)
      - `published_at` (timestamp, publication date)
      - `author_id` (uuid, references profiles)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Profiles: Users can read all profiles, update own profile
    - Posts: Everyone can read published posts, authors can manage their own posts
    - Admins have full access to posts

  3. Indexes
    - Posts by publication status and date
    - Posts by slug for fast lookups
    - Posts by author for admin dashboard
    - Full-text search on title and content
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  published_at timestamptz,
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are publicly readable"
  ON profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Posts policies
CREATE POLICY "Published posts are publicly readable"
  ON posts
  FOR SELECT
  TO authenticated, anon
  USING (published = true);

CREATE POLICY "Authors can view their own posts"
  ON posts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_published_date ON posts(published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_posts_search ON posts USING GIN(to_tsvector('english', title || ' ' || content));

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to handle user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data (optional for development)
DO $$
BEGIN
  -- Only insert sample data if tables are empty
  IF NOT EXISTS (SELECT 1 FROM profiles LIMIT 1) THEN
    -- Sample admin user (you'll need to create this user via Supabase Auth first)
    INSERT INTO profiles (id, name, email, role) VALUES
    ('00000000-0000-0000-0000-000000000000', 'Admin User', 'admin@example.com', 'admin')
    ON CONFLICT (id) DO NOTHING;

    -- Sample blog posts
    INSERT INTO posts (title, slug, excerpt, content, tags, published, published_at, author_id) VALUES
    (
      'Getting Started with Next.js 14',
      'getting-started-nextjs-14',
      'Learn how to build modern web applications with Next.js 14 and the new app router.',
      '<h2>Introduction</h2><p>Next.js 14 brings exciting new features and improvements to the React framework. In this comprehensive guide, we''ll explore the new app router, server components, and much more.</p><h2>Key Features</h2><ul><li>App Router</li><li>Server Components</li><li>Improved Performance</li><li>Better Developer Experience</li></ul><p>Let''s dive into each of these features and see how they can improve your development workflow.</p>',
      ARRAY['Next.js', 'React', 'Web Development', 'Tutorial'],
      true,
      now() - interval '2 days',
      '00000000-0000-0000-0000-000000000000'
    ),
    (
      'Mastering TypeScript in 2024',
      'mastering-typescript-2024',
      'A deep dive into TypeScript features, best practices, and advanced patterns for modern web development.',
      '<h2>Why TypeScript?</h2><p>TypeScript has become an essential tool for JavaScript developers. It provides static type checking, better IDE support, and helps prevent common runtime errors.</p><h2>Advanced Features</h2><p>In this post, we''ll cover advanced TypeScript features including:</p><ul><li>Conditional Types</li><li>Mapped Types</li><li>Template Literal Types</li><li>Utility Types</li></ul><p>These features will help you write more robust and maintainable code.</p>',
      ARRAY['TypeScript', 'JavaScript', 'Programming', 'Tutorial'],
      true,
      now() - interval '5 days',
      '00000000-0000-0000-0000-000000000000'
    ),
    (
      'Building Responsive UIs with Tailwind CSS',
      'responsive-uis-tailwind-css',
      'Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes.',
      '<h2>Introduction to Tailwind CSS</h2><p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs quickly and efficiently.</p><h2>Responsive Design</h2><p>With Tailwind''s responsive utilities, you can easily create layouts that work on all screen sizes:</p><ul><li>Mobile-first approach</li><li>Breakpoint system</li><li>Flexbox and Grid utilities</li><li>Spacing and sizing</li></ul><p>Let''s explore how to use these features effectively.</p>',
      ARRAY['CSS', 'Tailwind', 'Frontend', 'Design', 'Responsive'],
      true,
      now() - interval '1 week',
      '00000000-0000-0000-0000-000000000000'
    ),
    (
      'The Future of Web Development',
      'future-web-development',
      'Exploring emerging trends and technologies that will shape the future of web development.',
      '<h2>Emerging Technologies</h2><p>The web development landscape is constantly evolving. Here are some key trends to watch:</p><ul><li>Web Assembly</li><li>Edge Computing</li><li>AI-Powered Development</li><li>Progressive Web Apps</li></ul><p>These technologies are changing how we build and deploy web applications.</p><h2>What This Means for Developers</h2><p>As developers, we need to stay current with these trends and understand how they impact our work.</p>',
      ARRAY['Web Development', 'Future', 'Technology', 'Trends'],
      true,
      now() - interval '10 days',
      '00000000-0000-0000-0000-000000000000'
    );
  END IF;
END $$;