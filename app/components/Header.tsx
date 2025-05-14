"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "@/app/components/ModeToggle";

export function Header() {


  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 justify-between mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href={'/'} className="flex items-center space-x-2">
            <span className="text-xl font-bold">Role-Based Auth</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}