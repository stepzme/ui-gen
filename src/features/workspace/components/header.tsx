"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { Avatar, AvatarFallback } from "@/app/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui/components/dropdown-menu";
import { Sun, Moon, Search, Menu, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  workspaceId: string;
}

interface SearchResult {
  projects: Array<{ id: string; name: string; workspaceId: string }>;
  documents: Array<{ id: string; name: string; projectId: string }>;
}

export function Header({ workspaceId }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const user = session?.user as { id?: string; email?: string; name?: string } | undefined;
  const userName = user?.name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || userEmail[0]?.toUpperCase() || "U";

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults(null);
      setIsSearchOpen(false);
      return;
    }

    const performSearch = async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}&workspaceId=${workspaceId}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setIsSearchOpen(true);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    performSearch();
  }, [debouncedQuery, workspaceId]);

  const handleSearchResultClick = useCallback(
    (type: "project" | "document", id: string, projectId?: string) => {
      if (type === "project") {
        router.push(`/workspace/${workspaceId}/project/${id}`);
      } else if (type === "document") {
        router.push(`/document/${id}`);
      }
      setSearchQuery("");
      setSearchResults(null);
      setIsSearchOpen(false);
    },
    [router, workspaceId]
  );

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-muted/30">
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Search - Left side */}
        <div className="relative min-w-[320px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects and documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchResults) setIsSearchOpen(true);
            }}
            onBlur={(e) => {
              // Delay to allow clicking on results
              const relatedTarget = e.relatedTarget as HTMLElement;
              if (!relatedTarget?.closest('.search-results')) {
                setTimeout(() => setIsSearchOpen(false), 200);
              }
            }}
            className="pl-9 pr-4"
          />
          {isSearchOpen && searchResults && (
            <div 
              className="search-results absolute top-full left-0 right-0 mt-1 max-h-96 overflow-y-auto rounded-md border border-border bg-popover shadow-lg z-50"
              onMouseDown={(e) => e.preventDefault()}
            >
              {searchResults.projects.length > 0 && (
                <div className="p-2">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Projects
                  </div>
                  {searchResults.projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleSearchResultClick("project", project.id)}
                      className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              )}
              {searchResults.documents.length > 0 && (
                <div className="p-2">
                  {searchResults.projects.length > 0 && (
                    <div className="mb-1 border-t border-border pt-1" />
                  )}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Documents
                  </div>
                  {searchResults.documents.map((document) => (
                    <button
                      key={document.id}
                      onClick={() => handleSearchResultClick("document", document.id, document.projectId)}
                      className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {document.name}
                    </button>
                  ))}
                </div>
              )}
              {searchResults.projects.length === 0 && searchResults.documents.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side - User info, Menu */}
        <div className="flex items-center gap-3">
          {/* User Info */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-foreground">{userName}</span>
            <span className="text-xs text-muted-foreground">{userEmail}</span>
          </div>

          {/* Avatar */}
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
          </Avatar>

          {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={toggleTheme}>
                {isDark ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Light theme
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark theme
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

