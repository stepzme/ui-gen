-- CreateTable
CREATE TABLE "UserDocumentView" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "lastViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEditedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDocumentView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserDocumentView_userId_lastEditedAt_idx" ON "UserDocumentView"("userId", "lastEditedAt");

-- CreateIndex
CREATE INDEX "UserDocumentView_documentId_idx" ON "UserDocumentView"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDocumentView_userId_documentId_key" ON "UserDocumentView"("userId", "documentId");

-- AddForeignKey
ALTER TABLE "UserDocumentView" ADD CONSTRAINT "UserDocumentView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocumentView" ADD CONSTRAINT "UserDocumentView_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
