-- CreateTable
CREATE TABLE "Document" (
"id" SERIAL,
    "formalAppLetter" TEXT,
    "constitution" TEXT,
    "byLaws" TEXT,
    "registrationPapersCopy" TEXT,
    "membership" TEXT,
    "organizationId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_organizationId_unique" ON "Document"("organizationId");

-- AddForeignKey
ALTER TABLE "Document" ADD FOREIGN KEY("organizationId")REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
