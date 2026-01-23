"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Shield,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import ProfileLayout from "./profile-layout";

export default function SectionProfile() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.global);
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect if not logged in
  if (!user) {
    router.push("/");
    return null;
  }

  const userInitials = user?.email?.slice(0, 2).toUpperCase() || "U";
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const handleSignOut = async () => {
    // await signOut();
    toast.success("Signed out successfully");
    router.push("/");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    // Simulate update - in production, this would update the user's profile
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsUpdating(false);
    toast.success("Profile updated successfully");
  };

  return (
    <>
      <div className="container px-4 py-8 md:py-12 mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="relative">
            <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-background shadow-xl">
              <AvatarFallback className="text-2xl md:text-3xl font-bold bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 h-5 w-5 rounded-full border-2 border-background" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex flex-col">
                <span className="block text-sm md:text-base font-medium text-foreground">
                  Welcome,
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {user?.name}
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4" />
              {user?.email}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Calendar className="h-3 w-3" />
                Member since {joinDate}
              </Badge>
              <Badge className="gap-1 bg-green-500/10 text-green-600 border-green-500/20">
                <Shield className="h-3 w-3" />
                Verified
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />
        <ProfileLayout />

        {/* Profile Tabs */}
        {/* <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="overview" className="gap-2">
              <User className="h-4 w-4 hidden md:inline" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4 hidden md:inline" />
              Adoptions
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4 hidden md:inline" />
              Settings
            </TabsTrigger>
          </TabsList> */}

        {/* Overview Tab */}
        <Tabs>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Stats Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cart Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    {/* <span className="text-2xl font-bold">{cart.length}</span> */}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pets waiting for adoption
                  </p>
                </CardContent>
              </Card>

              {/* Favorites Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Favorites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-destructive" />
                    <span className="text-2xl font-bold">0</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Saved for later
                  </p>
                </CardContent>
              </Card>

              {/* Adoptions Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Completed Adoptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary fill-primary" />
                    <span className="text-2xl font-bold">0</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pets found their forever home
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground text-xs">
                      Email Address
                    </Label>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">
                      User ID
                    </Label>
                    <p className="font-mono text-sm text-muted-foreground truncate">
                      {user?._id}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">
                      Member Since
                    </Label>
                    <p className="font-medium">{joinDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">
                      Last Sign In
                    </Label>
                    <p className="font-medium">
                      {/* {user?.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Just now"} */}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders/Adoptions Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adoption History</CardTitle>
                <CardDescription>
                  Track your pet adoption applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No adoptions yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start your journey by finding your perfect companion
                  </p>
                  <Button
                    variant="default"
                    onClick={() => router.push("/pets")}
                  >
                    Browse Pets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter your address" />
                    </div>
                  </div>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Email Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Email Preferences</CardTitle>
                <CardDescription>
                  Manage your email notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Adoption Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about your adoption applications
                    </p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new pets and events
                    </p>
                  </div>
                  <Badge variant="outline">Disabled</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Sign Out</p>
                    <p className="text-sm text-muted-foreground">
                      Sign out from your account on this device
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
