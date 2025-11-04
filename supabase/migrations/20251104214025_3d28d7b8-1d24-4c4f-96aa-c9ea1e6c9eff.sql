-- Create table for posture events
CREATE TABLE public.posture_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.posture_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read posture events (public dashboard)
CREATE POLICY "Anyone can view posture events" 
ON public.posture_events 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert posture events (ESP32 will insert)
CREATE POLICY "Anyone can insert posture events" 
ON public.posture_events 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries by timestamp
CREATE INDEX idx_posture_events_timestamp ON public.posture_events(timestamp DESC);