import { Leaf } from "lucide-react";
import { Link } from '@inertiajs/react';
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function LpHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="container mx-auto px-4 py-6 sticky top-0 bg-transparent backdrop-blur-sm border-b border-gray-300 z-10">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg lg:text-xl font-bold text-gray-600">
                        デジタル名刺アプリ
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href={route('register')}>
                        <Button variant="ghost" className="text-white hover:text-gray-600 bg-orange-300">
                            始める！
                        </Button>
                    </Link>
                    <Link href={route('login')} onClick={() => setIsMenuOpen(false)}>
                        <Button className="bg-green-300 hover:text-gray-600 text-white rounded-full">
                            ログイン
                        </Button>
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] bg-white">
                            <div className="flex flex-col gap-4 mt-10 px-4">
                                <Link href={route('register')}>
                                    <Button variant="ghost" className="w-[80%] text-white hover:text-gray-600 bg-orange-300 text-center">
                                        始める！
                                    </Button>
                                </Link>
                                <Link href={route('login')} onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-[80%] bg-green-300 hover:text-gray-600 text-white rounded-ful text-center">
                                        ログイン
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </nav>
        </header>
    );
}

