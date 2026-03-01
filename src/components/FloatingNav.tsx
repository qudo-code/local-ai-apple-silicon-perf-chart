import { auth } from "@/lib/auth";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth";

export default async function FloatingNav() {
    const session = await auth();

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
            <div className="flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-md border border-border/50 shadow-sm rounded-full">
                <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
                    hyperoptimized-nextjs-template
                </Link>

                <div className="flex items-center gap-4">
                    {session?.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                                    {session.user.image ? (
                                        <img src={session.user.image} alt={session.user.name || "User"} width={32} height={32} />
                                    ) : (
                                        <UserCircle className="w-6 h-6" />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2">
                                <div className="px-2 py-1.5 text-sm text-muted-foreground truncate">
                                    {session.user.email}
                                </div>
                                <form action={async () => {
                                    "use server";
                                    await signOut();
                                }}>
                                    <DropdownMenuItem asChild>
                                        <button className="w-full text-left cursor-pointer">
                                            Sign out
                                        </button>
                                    </DropdownMenuItem>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button variant="default" className="rounded-full">Sign In</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
