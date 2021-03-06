# Migration `watch-20191023150527`

This migration has been generated by Nikolas Burk at 10/23/2019, 3:05:27 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "lift"."Item" (
  "createdAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "id" TEXT NOT NULL   ,
  "invoice" TEXT    REFERENCES "Invoice"(id) ON DELETE SET NULL,
  "locatedIn" TEXT    REFERENCES "Room"(id) ON DELETE SET NULL,
  "name" TEXT NOT NULL DEFAULT ''  ,
  "price" REAL NOT NULL DEFAULT 0  ,
  "purchaseDate" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "type" TEXT    REFERENCES "ItemType"(id) ON DELETE SET NULL,
  "updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."Invoice" (
  "date" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,
  "id" TEXT NOT NULL   ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."ItemType" (
  "id" TEXT NOT NULL   ,
  "name" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "lift"."Room" (
  "floor" TEXT NOT NULL DEFAULT 'GROUND'  ,
  "id" TEXT NOT NULL   ,
  "meetingRoom" BOOLEAN NOT NULL DEFAULT false  ,
  "name" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..watch-20191023150527
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,47 @@
+datasource db {
+  provider = "sqlite"
+  url      = "file:dev.db"
+  default  = true
+}
+
+generator photon {
+  provider = "photonjs"
+}
+
+model Item {
+  id            String   @default(cuid()) @id
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
+  purchaseDate DateTime
+  name          String
+  type          ItemType
+  locatedIn     Room?
+  invoice       Invoice?
+  price         Float
+}
+
+model Invoice {
+  id    String   @default(cuid()) @id
+  date  DateTime
+  items Item[]
+}
+
+model ItemType {
+  id    String @default(cuid()) @id
+  name  String
+  items Item[]
+}
+
+model Room {
+  id          String  @default(cuid()) @id
+  name        String
+  items       Item[]
+  floor       Floor
+  meetingRoom Boolean
+}
+
+enum Floor {
+  GROUND
+  FIRST
+  EXECUTIVE
+}
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20191023150527)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20191023150527'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
