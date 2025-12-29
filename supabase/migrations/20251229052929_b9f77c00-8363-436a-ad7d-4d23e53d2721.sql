-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Travel',
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create destinations table
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  image_url TEXT,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.5,
  reviews INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  best_time TEXT NOT NULL,
  temperature TEXT NOT NULL,
  ideal_duration TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  attractions JSONB NOT NULL DEFAULT '[]',
  cuisine TEXT[] NOT NULL DEFAULT '{}',
  travel_tips TEXT[] NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create adventures table
CREATE TABLE public.adventures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Moderate',
  duration TEXT NOT NULL,
  group_size TEXT NOT NULL,
  altitude TEXT,
  distance TEXT,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.5,
  reviews INTEGER NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  itinerary JSONB NOT NULL DEFAULT '[]',
  essentials TEXT[] NOT NULL DEFAULT '{}',
  best_time TEXT NOT NULL,
  physical_requirement TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adventures ENABLE ROW LEVEL SECURITY;

-- Blog policies
CREATE POLICY "Anyone can view published blogs"
  ON public.blogs FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all blogs"
  ON public.blogs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create blogs"
  ON public.blogs FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blogs"
  ON public.blogs FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blogs"
  ON public.blogs FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Destination policies
CREATE POLICY "Anyone can view published destinations"
  ON public.destinations FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all destinations"
  ON public.destinations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create destinations"
  ON public.destinations FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update destinations"
  ON public.destinations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete destinations"
  ON public.destinations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Adventure policies
CREATE POLICY "Anyone can view published adventures"
  ON public.adventures FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all adventures"
  ON public.adventures FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create adventures"
  ON public.adventures FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update adventures"
  ON public.adventures FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete adventures"
  ON public.adventures FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_destinations_updated_at
  BEFORE UPDATE ON public.destinations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_adventures_updated_at
  BEFORE UPDATE ON public.adventures
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();