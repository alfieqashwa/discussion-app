# Migration `20201209153330-creatednizations-one2many-to-users`

This migration has been generated by alfieqashwa at 12/9/2020, 10:33:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "users" DROP COLUMN "memberName",
DROP COLUMN "memberImage",
ADD COLUMN     "organizationId" INTEGER

CREATE TABLE "organizations" (
"id" SERIAL,
    "email" TEXT,
    "name" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "website" TEXT,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "organizations.email_unique" ON "organizations"("email")

ALTER TABLE "users" ADD FOREIGN KEY("organizationId")REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127165858-changed-entity-name-to-member-for-general-explanation..20201209153330-creatednizations-one2many-to-users
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,17 +12,17 @@
 model User {
   id            Int       @id @default(autoincrement())
   name          String?
-  memberName    String?
-  memberImage   String?
   email         String?   @unique
   emailVerified DateTime? @map(name: "email_verified")
   image         String?
   role          Role      @default(USER)
   createdAt     DateTime  @default(now()) @map(name: "created_at")
   updatedAt     DateTime  @default(now()) @map(name: "updated_at")
   posts         Post[]
+  organization  Organization? @relation(fields: [organizationId], references: [id])
+  organizationId Int?
   @@map(name: "users")
 }
@@ -68,8 +68,20 @@
   @@map(name: "verification_requests")
 }
+model Organization {
+  id  Int @id @default(autoincrement())
+  email String? @unique
+  name String?
+  address String?
+  phone String?
+  website String?
+  users User[]
+
+  @@map(name: "organizations")
+}
+
 model Post {
   id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
```

