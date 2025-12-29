-- Add status column to blogs for approval workflow
ALTER TABLE public.blogs 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending' 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- Update existing published blogs to approved status
UPDATE public.blogs 
SET status = 'approved' 
WHERE is_published = true;

-- Create policy for authenticated users to submit blogs
CREATE POLICY "Authenticated users can submit blogs" 
ON public.blogs 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = author_id AND status = 'pending' AND is_published = false);

-- Allow users to view their own submitted blogs
CREATE POLICY "Users can view their own blogs" 
ON public.blogs 
FOR SELECT 
TO authenticated
USING (auth.uid() = author_id);

-- Allow users to update their own pending blogs
CREATE POLICY "Users can update their own pending blogs" 
ON public.blogs 
FOR UPDATE 
TO authenticated
USING (auth.uid() = author_id AND status = 'pending');

-- Allow users to delete their own pending blogs
CREATE POLICY "Users can delete their own pending blogs" 
ON public.blogs 
FOR DELETE 
TO authenticated
USING (auth.uid() = author_id AND status = 'pending');