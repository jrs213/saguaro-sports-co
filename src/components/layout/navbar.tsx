import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Search } from "lucide-react";

export default function Navbar() {
    return (
        <header className="border-b bg-white">
            <div className=" h-16 flex items-center justify-between px-4 md:px-8">

                {/* Left Nav Section */}
                <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="Saguaro Sports Co. Logo" width={180} height={60} className="h-10 w-auto sm:h-11 md:h-12 lg:h-13 object-contain" />
                </Link>

                {/* Center Nav Section */}
                <div className="hidden md:flex flex-1 max-w-md mx-6">
                    <div className="relative w-full max-w-md">
                    <Input placeholder="Search cards, players, sets..." className="pr-10" />
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                </div>

                {/* Right Nav Section */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-black transition">
                    Collection
                    </Link>
                    <Link href="/" className="text-sm text-muted-foreground hover:text-black transition">
                    Featured
                    </Link>
                    <Button className="bg-[#3f6b4b] hover:bg-[#2f5239]" size="sm">
                    About
                    </Button>
                </div>
            </div>
        </header>
    );
}