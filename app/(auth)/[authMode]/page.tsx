"use client";
import { notFound, redirect } from "next/navigation";
import React, { useActionState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Lock, User } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import { login, signup } from "@/actions/auth.action";

export default function AuthPage({
  params,
}: {
  params: Promise<{ authMode: string }>;
}) {
  const { authMode } = React.use(params);

  if (authMode !== "signup" && authMode !== "login") {
    notFound();
  }

  const actionFn = authMode === "signup" ? signup : login;

  const [state, action, pending] = useActionState(actionFn, undefined);

  const handleRedirection = () => {
    if (authMode === "signup") {
      redirect("/login");
    } else {
      redirect("/signup");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-slate-100 dark:bg-gray-950">
      {/* Loading Screen */}
      {pending && <LoadingScreen message="Signing you Up..." />}

      {/* Signup Section */}
      <section className="px-4 sm:px-6 py-8 flex items-center flex-col gap-8 max-w-[500px] w-full">
        {/* Header */}
        <div className="flex justify-between w-full gap-5 items-start p-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl text-foreground">
              {authMode === "signup" ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground">
              {authMode === "signup"
                ? "Make an account to save your chats"
                : "Sign in to access your profile"}
            </p>
          </div>
          <div className="flex flex-col gap-3 items-end">
            <p className="text-sm text-muted-foreground">
              {authMode === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
            <Button
              variant="outline"
              onClick={handleRedirection}
              className="whitespace-nowrap bg-light-4 text-black dark:text-black dark:bg-white"
            >
              {authMode === "signup" ? "Log In" : "Create Account"}
            </Button>
          </div>
        </div>

        {/* Signup Card */}
        <Card className="w-full bg-white dark:bg-dark-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {authMode === "signup" ? "Sign Up" : "Sign In"}
            </CardTitle>
            <CardDescription className="text-center">
              {authMode === "signup"
                ? " Choose your preferred sign up method"
                : " Choose your preferred sign in method"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-dark-4 px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form action={action} className="space-y-4">
              {authMode === "signup" ? (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="John Doe"
                      required
                      disabled={pending}
                      className="pl-10"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    required
                    disabled={pending}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    minLength={8}
                    maxLength={15}
                    disabled={pending}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Requirements */}
              {state?.errors?.password && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div>
                      <p className="font-medium mb-2">Password must:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {state.errors.password.map((error) => (
                          <li key={error} className="text-sm">
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              <Separator />
              {/* General Error Messages */}
              {(state?.errors?.email || state?.message) && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {state?.errors?.email || state?.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={pending}>
                {pending
                  ? authMode === "signup"
                    ? "Creating Account..."
                    : "Signing In..."
                  : authMode === "signup"
                  ? "Create Account"
                  : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
