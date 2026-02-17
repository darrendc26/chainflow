-- CreateTable
CREATE TABLE "Transfer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transfer_userId_idx" ON "Transfer"("userId");
