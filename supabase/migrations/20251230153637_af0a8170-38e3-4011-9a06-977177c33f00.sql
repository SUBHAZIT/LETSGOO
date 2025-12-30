-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can submit blogs" ON public.blogs;

-- Create the same policy but as PERMISSIVE (default)
CREATE POLICY "Authenticated users can submit blogs" 
ON public.blogs 
FOR INSERT 
TO authenticated
WITH CHECK (
  (auth.uid() = author_id) 
  AND (status = 'pending'::text) 
  AND (is_published = false)
);