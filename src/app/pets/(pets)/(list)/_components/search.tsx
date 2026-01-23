"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PetCategory } from "@/data/pets";
import { Bird, Cat, Dog, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const categories: {
  id: PetCategory | "all";
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "all", label: "All Pets", icon: null },
  { id: "dog", label: "Dogs", icon: <Dog className="h-4 w-4" /> },
  { id: "cat", label: "Cats", icon: <Cat className="h-4 w-4" /> },
  { id: "bird", label: "Birds", icon: <Bird className="h-4 w-4" /> },
];

function SearchSection() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<
    PetCategory | "all"
  >("all");
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <section className="px-4 md:px-2 py-12 md:py-20 gradient-hero">
      <div className="container text-center mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Our Adorable <span className="text-gradient">Pets</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Browse through our wonderful collection of pets looking for their
          forever homes. Use the filters to find your perfect match.
        </p>

        {/* Search and Filters */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, breed, or description..."
              // value={searchQuery}
              className="pl-12 h-14 rounded-2xl bg-background text-base shadow-soft"
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get("search")?.toString()}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.icon}
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
