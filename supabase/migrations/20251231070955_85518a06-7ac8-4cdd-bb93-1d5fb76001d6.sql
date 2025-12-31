-- Add images array column to destinations table
ALTER TABLE public.destinations 
ADD COLUMN images text[] NOT NULL DEFAULT '{}';

-- Add images array column to adventures table
ALTER TABLE public.adventures 
ADD COLUMN images text[] NOT NULL DEFAULT '{}';

-- Migrate existing image_url to images array for destinations
UPDATE public.destinations 
SET images = ARRAY[image_url]
WHERE image_url IS NOT NULL AND image_url != '';

-- Migrate existing image_url to images array for adventures
UPDATE public.adventures 
SET images = ARRAY[image_url]
WHERE image_url IS NOT NULL AND image_url != '';