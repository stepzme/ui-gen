-- AlterTable
ALTER TABLE "Project" ADD COLUMN "isPersonal" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Project_workspaceId_isPersonal_idx" ON "Project"("workspaceId", "isPersonal");

-- Create personal projects for existing users
-- For each workspace member, create a personal project if one doesn't exist
INSERT INTO "Project" ("id", "workspaceId", "name", "isPersonal", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid() as "id",
  wm."workspaceId",
  'Drafts' as "name",
  true as "isPersonal",
  NOW() as "createdAt",
  NOW() as "updatedAt"
FROM "WorkspaceMember" wm
WHERE NOT EXISTS (
  SELECT 1 
  FROM "Project" p 
  WHERE p."workspaceId" = wm."workspaceId" 
    AND p."isPersonal" = true
    AND EXISTS (
      SELECT 1 
      FROM "ProjectMember" pm 
      WHERE pm."projectId" = p."id" 
        AND pm."userId" = wm."userId" 
        AND pm."role" = 'OWNER'
    )
)
GROUP BY wm."workspaceId", wm."userId";

-- Add project memberships for the created personal projects
INSERT INTO "ProjectMember" ("id", "projectId", "userId", "role", "createdAt")
SELECT 
  gen_random_uuid() as "id",
  p."id" as "projectId",
  wm."userId",
  'OWNER' as "role",
  NOW() as "createdAt"
FROM "Project" p
INNER JOIN "WorkspaceMember" wm ON p."workspaceId" = wm."workspaceId"
WHERE p."isPersonal" = true
  AND NOT EXISTS (
    SELECT 1 
    FROM "ProjectMember" pm 
    WHERE pm."projectId" = p."id" 
      AND pm."userId" = wm."userId"
  );
