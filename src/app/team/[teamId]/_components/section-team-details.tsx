"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ITeam } from "../../common/team-types";
import { Suspense } from "react";
import PageLoader from "@/components/page-loader/page-loader";

interface SectionTeamDetailsProps {
  teamId: string;
  team: ITeam;
}

const SectionTeamDetails = ({ team }: SectionTeamDetailsProps) => {
  // const member = teamMembers.find((m) => m.id === teamId);

  if (!team) {
    return (
      <div className="container py-20 text-center mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Team member not found
        </h1>
        <Button asChild>
          <Link href="/team">Back to Team</Link>
        </Button>
      </div>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <section className="py-12 px-4 md:px-2 md:py-20">
        <div className="container mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/team">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image & Social */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden shadow-card mb-6 h-[350px] w-auto md:h-[400px] md:w-[350px] relative">
                  <Image
                    src={team?.profileImage as string}
                    alt={team.name}
                    fill
                    className="w-full object-cover"
                  />
                </div>

                {/* Social Links */}
                {/* <div className="flex justify-center gap-4">
                  {team.socialMedia.twitter && (
                    <a
                      href={team.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialMedia.linkedin && (
                    <a
                      href={member.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialMedia.email && (
                    <a
                      href={`mailto:${member.socialMedia.email}`}
                      className="h-12 w-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div> */}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1
                  className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  {team.name}
                </h1>
                <p className="text-xl text-primary font-semibold mb-6">
                  {team?.post}
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: team?.description }}
                  className="text-muted-foreground leading-relaxed max-w-full break-words"
                />
              </div>

              <div>
                <h2
                  className="text-xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  Biography
                </h2>
                {/* <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p> */}
              </div>

              <div>
                <h2
                  className="text-xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {/* {member.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 text-sm"
                    >
                      {specialty}
                    </Badge>
                  ))} */}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="p-6 rounded-2xl bg-muted/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3
                    className="font-bold text-foreground"
                    style={{ fontFamily: "Fredoka, sans-serif" }}
                  >
                    Want to get in touch?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Feel free to reach out for any inquiries.
                  </p>
                </div>
                <Button variant="default" asChild>
                  <a href={`mailto:${team.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default SectionTeamDetails;
