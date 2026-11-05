// Extended interface to include video
export interface ClientInfo {
  id: string;
  name: string;
  title: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
  };
  description: string[];
  services: string[];
  testimonial: {
    quote: string;
    source: string;
    videoUrl?: string; // Added video URL
    videoThumbnail?: string; // Added video thumbnail
  };
  imageSrc: string;
}

// Client stories are currently unpublished. Add approved stories before restoring this page.
export const clientData: ClientInfo[] = [];
