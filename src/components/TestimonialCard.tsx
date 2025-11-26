import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  customerName: string;
  customerLocation: string;
  tourName: string;
  rating: number;
  testimonialText: string;
  visitDate?: string | null;
}

export const TestimonialCard = ({
  customerName,
  customerLocation,
  tourName,
  rating,
  testimonialText,
  visitDate,
}: TestimonialCardProps) => {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all border-secondary/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Quote className="w-10 h-10 text-secondary/30" />
          <div className="flex">{renderStars()}</div>
        </div>

        <p className="text-foreground/90 mb-6 italic leading-relaxed">
          "{testimonialText}"
        </p>

        <div className="border-t border-border/50 pt-4">
          <p className="font-semibold text-lg text-primary">{customerName}</p>
          <p className="text-sm text-muted-foreground">{customerLocation}</p>
          <p className="text-sm text-secondary font-medium mt-2">{tourName}</p>
          {visitDate && (
            <p className="text-xs text-muted-foreground mt-1">
              Visited: {new Date(visitDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
