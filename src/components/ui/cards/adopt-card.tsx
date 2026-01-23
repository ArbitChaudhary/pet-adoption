import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, ExternalLink, PawPrint } from "lucide-react";
import Link from "next/link";
import { IPet } from "@/app/pets/(pets)/_common/pet-types";
import Image from "next/image";

interface AdoptionCardProps {
  adoption: IPet;
}

export function AdoptionCard({ adoption }: AdoptionCardProps) {
  const statusConfig = {
    pending: {
      icon: Clock,
      label: "Pending Review",
      variant: "secondary" as const,
      color: "text-yellow-600",
    },
    approved: {
      icon: CheckCircle2,
      label: "Approved",
      variant: "default" as const,
      color: "text-green-600",
    },
    completed: {
      icon: PawPrint,
      label: "Completed",
      variant: "default" as const,
      color: "text-primary",
    },
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-40 h-40 sm:h-auto overflow-hidden flex-shrink-0">
          <Image
            src={adoption.image}
            alt={adoption.name}
            fill
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 hidden sm:block" />
        </div>
        <CardContent className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {adoption.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {adoption.breed}
                </p>
              </div>
              {/* <Badge variant={config.variant} className="gap-1 shrink-0">
                <StatusIcon className={`h-3 w-3 ${config.color}`} />
                {config.label}
              </Badge> */}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
              <span className="bg-muted px-2 py-1 rounded capitalize">
                {adoption.category}
              </span>
              <span className="bg-muted px-2 py-1 rounded">{adoption.age}</span>
              <span className="bg-muted px-2 py-1 rounded capitalize">
                {adoption.gender}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {/* <p className="text-xs text-muted-foreground">
              Applied on {new Date(adoptedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p> */}
            <Button size="sm" variant="ghost" asChild>
              <Link href={`/pets/${adoption._id}`}>
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
