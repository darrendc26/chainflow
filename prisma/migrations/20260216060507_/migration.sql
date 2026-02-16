-- CreateTable
CREATE TABLE "Nonce" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nonce" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Nonce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nonce_userId_key" ON "Nonce"("userId");

-- CreateIndex
CREATE INDEX "Nonce_userId_idx" ON "Nonce"("userId");
