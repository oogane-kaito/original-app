"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {  Globe, Mail, Leaf, Sun, ExternalLink } from "lucide-react";

const iconMap = {
  twitter: Globe,
  instagram: Globe,
  linkedin: Globe,
  github: Globe,
  website: Globe,
  mail: Mail,
};

export function DigitalCard({ data }) {
  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Globe;
    return IconComponent;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Card
        className="border-0 shadow-2xl overflow-hidden relative rounded-3xl"
        style={{ backgroundColor: data.backgroundColor }}
      >
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <Sun className="w-6 h-6" style={{ color: data.accentColor }} />
        </div>
        <div className="absolute bottom-4 left-4 opacity-10">
          <Leaf className="w-8 h-8" style={{ color: data.accentColor }} />
        </div>
        <div className="absolute top-8 left-6 opacity-15">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.accentColor }} />
        </div>
        <div className="absolute bottom-8 right-6 opacity-15">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.accentColor }} />
        </div>

        <CardContent className="p-8 text-center relative z-10">
          {/* Avatar */}
          <div className="mb-6">
            <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-lg">
              <AvatarImage src={data.avatar || "/placeholder.svg"} alt={data.name} />
              <AvatarFallback className="text-2xl font-bold text-white" style={{ backgroundColor: data.accentColor }}>
                {data.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name and Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-3" style={{ color: data.textColor }}>
              {data.name}
            </h2>
            <Badge
              className="text-white border-0 px-4 py-2 rounded-full text-sm"
              style={{ backgroundColor: data.accentColor }}
            >
              {data.title}
            </Badge>
          </div>

          {/* Bio */}
          {data.bio && (
            <div className="mb-8">
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ color: data.textColor, opacity: 0.8 }}
              >
                {data.bio}
              </p>
            </div>
          )}

          {/* Email and Phone */}
          <div className="mb-6">
            {data.email && (
              <div className="text-sm" style={{ color: data.textColor }}>
                <Mail className="inline-block w-4 h-4 mr-1" />
                {data.email}
              </div>
            )}
            {data.phone && (
              <div className="text-sm" style={{ color: data.textColor }}>
                <span className="inline-block w-4 h-4 mr-1">📞</span>
                {data.phone}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="space-y-3">
            {data.links.map((link) => {
              const IconComponent = getIcon(link.icon);
              return (
                <Button
                  key={link.id}
                  variant="outline"
                  className="w-full justify-between group hover:shadow-lg transition-all duration-200 rounded-2xl border-2"
                  style={{
                    borderColor: data.accentColor + "40",
                    color: data.textColor,
                  }}
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5" style={{ color: data.accentColor }} />
                    <span className="font-medium">{link.title}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200/50">
            <div className="flex items-center justify-center gap-2 text-xs opacity-60">
              <Leaf className="w-3 h-3" style={{ color: data.accentColor }} />
              <span>Made with NatureLink</span>
              <Sun className="w-3 h-3" style={{ color: data.accentColor }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}