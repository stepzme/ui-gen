"use client";

import { useState, useEffect, useCallback, memo } from "react";
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
import { Sun, Moon, Search, Menu, Settings, LogOut, FileText, Folder, ChevronRight } from "lucide-react";
import { Spinner } from "@/app/ui/spinner";
import { Skeleton } from "@/app/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  workspaceId: string;
  isLoading?: boolean;
}

interface SearchResult {
  projects: Array<{ id: string; name: string; workspaceId: string; documentCount: number }>;
  documents: Array<{ id: string; name: string; projectId: string; projectName: string }>;
}

function HeaderComponent({ workspaceId, isLoading }: HeaderProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const isLoadingSession = status === "loading";
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
    <header className="sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between gap-4 p-4">
        {/* Search - Left side */}
        <div className="relative min-w-[320px] max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
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
            className="pl-9 pr-4 [&::-webkit-search-cancel-button]:hidden"
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
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-muted-foreground">
                        <Folder />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <span className="text-sm font-medium text-foreground truncate">{project.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {project.documentCount} {project.documentCount === 1 ? 'file' : 'files'}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
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
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-muted-foreground">
                        <FileText />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <span className="text-sm font-medium text-foreground truncate">{document.name}</span>
                        <span className="text-xs text-muted-foreground">{document.projectName}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
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
          <AnimatePresence mode="wait">
            {isLoadingSession ? (
              <motion.div
                key="user-info-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex flex-col items-end gap-1"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </motion.div>
            ) : (
              <motion.div
                key="user-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex flex-col items-end"
              >
                <span className="text-sm font-medium text-foreground">{userName}</span>
                <span className="text-xs text-muted-foreground">{userEmail}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar */}
          <AnimatePresence mode="wait">
            {isLoadingSession ? (
              <motion.div
                key="avatar-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Skeleton className="h-9 w-9 rounded-full" />
              </motion.div>
            ) : (
              <motion.div
                key="avatar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
                </Avatar>
              </motion.div>
            )}
          </AnimatePresence>

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

export const Header = memo(HeaderComponent);

