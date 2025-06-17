"use client"

import {Card,CardContent} from "../ui/card"
import { Button } from "../ui/button"
import { Avator, AvatorFallback, AvatarImage} from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Mail,Leaf,ExternalLink } from "lucide-react"
iconMap ={
    mail:Mail,
    leaf:Leaf,
    link:ExternalLink
}
export function DigitalCard({data}){
    const getIcon = (iconName) => {
        const IconComponent = iconMap[iconName] 
        return IconComponent
    }
    return(
        <div className="w-full max-w-sm mx-auto">
            <Card
              className="border-0 shadow-2xl overflow-hidden relative rounded-3xl"
              style={{backgroundColor: data.backgroundColor}}
            >

            </Card>
        </div>
    )
}