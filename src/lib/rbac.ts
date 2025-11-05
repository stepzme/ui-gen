export type Role = "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";

export interface Membership {
  role: Role;
}

export function canEdit(role: Role): boolean {
  return role === "OWNER" || role === "ADMIN" || role === "EDITOR";
}

export function effectiveRole(roles: Role[]): Role {
  if (roles.includes("OWNER")) return "OWNER";
  if (roles.includes("ADMIN")) return "ADMIN";
  if (roles.includes("EDITOR")) return "EDITOR";
  return "VIEWER";
}


