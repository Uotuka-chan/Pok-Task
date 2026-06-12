/*
  Warnings:

  - You are about to drop the column `effortValue` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemonName" TEXT,
    "nature" TEXT,
    "effortH" INTEGER DEFAULT 0,
    "effortA" INTEGER DEFAULT 0,
    "effortB" INTEGER DEFAULT 0,
    "effortC" INTEGER DEFAULT 0,
    "effortD" INTEGER DEFAULT 0,
    "effortS" INTEGER DEFAULT 0,
    "item" TEXT,
    "move1" TEXT,
    "move2" TEXT,
    "move3" TEXT,
    "move4" TEXT,
    "memo" TEXT,
    "imageUrl" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "dueDate", "id", "imageUrl", "isCompleted", "item", "memo", "move1", "move2", "move3", "move4", "nature", "pokemonName", "userId") SELECT "createdAt", "dueDate", "id", "imageUrl", "isCompleted", "item", "memo", "move1", "move2", "move3", "move4", "nature", "pokemonName", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
