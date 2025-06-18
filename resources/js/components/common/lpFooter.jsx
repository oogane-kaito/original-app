import { Leaf,Sun } from "lucide-react";

export default function LpFooter(){
    return(
        <footer className="container mx-auto px-4 py-6 sm:py-8 text-center text-gray-500">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <Leaf className="w-4 h-4 text-green-400"/>
                <span className="font-semibold text-sm sm:text-base">デジタル名刺サイト</span>
                <Sun className="w-4 h-4 text-orange-400"/>
            </div>
            <p className="text-sm">&copy; 2025 デジタル名刺サイト.made with がね</p>
        </footer>
    )
}