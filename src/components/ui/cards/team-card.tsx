"use client";
import { TeamMember } from "@/data/team";
import { Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Link
      href={`/team/${member.id}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          {member.socialMedia.twitter && (
            <a
              href={member.socialMedia.twitter}
              onClick={(e) => e.stopPropagation()}
              className="h-10 w-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {member.socialMedia.linkedin && (
            <a
              href={member.socialMedia.linkedin}
              onClick={(e) => e.stopPropagation()}
              className="h-10 w-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.socialMedia.email && (
            <a
              href={`mailto:${member.socialMedia.email}`}
              onClick={(e) => e.stopPropagation()}
              className="h-10 w-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <div className="p-5 text-center">
        <h3
          className="text-lg font-bold text-foreground"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {member.name}
        </h3>
        <p className="text-sm text-primary font-medium mt-1">{member.title}</p>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {member.description}
        </p>
      </div>
    </Link>
  );
}
