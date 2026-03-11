export interface TourPageContent extends Record<string, unknown> {
  hero_title: string;
  hero_subtitle: string;
  introduction: string;
  combo_experiences_title: string;
  combo_experiences_description: string;
  combo_experiences: Array<{
    title: string;
    description: string;
  }>;
  cta_title: string;
  cta_description: string;
  cta_buttons: Array<{
    label: string;
    link: string;
    variant: 'default' | 'outline' | 'secondary';
  }>;
  seasonal_guide_title: string;
  seasonal_guide_description: string;
  seasonal_guide_link: string;
  is_active: boolean;
  updated_at: string;
  created_at: string;
}

export const DEFAULT_TOUR_PAGE_CONTENT: TourPageContent = {
  hero_title: "Rwanda Tours & Safari Experiences",
  hero_subtitle: "Discover Rwanda's Extraordinary Wildlife and Landscapes",
  introduction: "Rwanda, the \"Land of a Thousand Hills,\" offers some of Africa's most profound wildlife encounters. From endangered mountain gorillas in misty volcanic forests to chimpanzees in ancient rainforests and Big Five safaris in savannah landscapes, Rwanda delivers unforgettable moments at every turn.\n\nVirunga Expedition Tours specializes in creating seamless, expertly-guided experiences across all of Rwanda's premier wildlife destinations.",
  combo_experiences_title: "Popular Tour Combinations",
  combo_experiences_description: "Many travelers combine multiple experiences for a comprehensive Rwanda adventure:",
  combo_experiences: [
    {
      title: "Gorillas & Golden Monkeys",
      description: "Two-day Volcanoes Park experience combining both primate encounters"
    },
    {
      title: "Primates & Safari",
      description: "Gorillas in Volcanoes Park plus Akagera game drives for complete wildlife experience"
    },
    {
      title: "Complete Rwanda",
      description: "Gorillas, Chimps, and Safari across all major parks (7-10 days)"
    },
    {
      title: "Family Adventure",
      description: "Golden monkeys, Akagera, and cultural experiences (no gorilla age restrictions)"
    }
  ],
  cta_title: "Ready to Book Your Rwanda Adventure?",
  cta_description: "Our team will help you select the perfect combination of experiences based on your interests, timeframe, and budget.",
  cta_buttons: [
    {
      label: "Request Custom Quote",
      link: "/contact",
      variant: "default"
    },
    {
      label: "Create Custom Package",
      link: "/contact",
      variant: "outline"
    }
  ],
  seasonal_guide_title: "Best Time to Visit?",
  seasonal_guide_description: "Rwanda offers incredible experiences year-round, but each season brings unique advantages. Use our interactive comparison tool to see how parks transform throughout the year.",
  seasonal_guide_link: "/tours/seasonal-comparison",
  is_active: true,
  updated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
};