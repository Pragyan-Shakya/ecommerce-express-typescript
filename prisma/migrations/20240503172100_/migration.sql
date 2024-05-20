-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'others');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive', 'blocked');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "avatar" TEXT,
    "gender" "Gender",
    "status" "Status" NOT NULL DEFAULT 'inactive',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
