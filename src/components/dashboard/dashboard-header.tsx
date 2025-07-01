"use client";

import Link from "next/link";
import { Github, BookOpen, Linkedin, Globe } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DashboardHeader() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b">
      <div className="flex items-center gap-6">
        <Image
          src="/corp-desk-logo.svg"
          alt="Corp Desk Logo"
          width={128}
          height={128}
          quality={100}
          priority
        />
      </div>
      <TooltipProvider>
        <nav className="flex items-center gap-2">
          {/* Repositório: ícone + texto */}
          <Button asChild variant="outline" className="px-3 py-2">
            <Link
              href="https://github.com/David-Santosx/corp-desk-app"
              target="_blank"
              aria-label="Repositório no GitHub"
              className="flex items-center gap-2 text-white"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">Repositório</span>
            </Link>
          </Button>

          {/* Documentação: ícone + texto + hover card */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button asChild variant="outline" className="px-3 py-2">
                <Link
                  href="https://github.com/David-Santosx/corp-desk-app#readme"
                  target="_blank"
                  aria-label="Documentação"
                  className="flex items-center gap-2 text-white"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="hidden sm:inline">Documentação</span>
                </Link>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[#ff6900]">
                  Documentação do Projeto
                </span>
                <span className="text-xs text-white/80">
                  Veja como instalar, configurar e contribuir com o Corp Desk.
                  Inclui exemplos de uso, arquitetura e FAQ.
                </span>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Sociais: só ícone + tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <Link
                  href="https://www.linkedin.com/in/david-santosx/"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>LinkedIn</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <Link
                  href="https://david-santosx.github.io/"
                  target="_blank"
                  aria-label="Portfólio"
                  className="text-white"
                >
                  <Globe className="w-5 h-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Portfólio</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </header>
  );
}
