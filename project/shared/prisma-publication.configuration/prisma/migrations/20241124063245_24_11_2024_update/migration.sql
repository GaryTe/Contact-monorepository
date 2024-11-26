/*
  Warnings:

  - The primary key for the `additional_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_additional_data` on the `additional_data` table. All the data in the column will be lost.
  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_comment` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `publications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_publication` on the `publications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "additional_data" DROP CONSTRAINT "additional_data_publication_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_publication_id_fkey";

-- AlterTable
ALTER TABLE "additional_data" DROP CONSTRAINT "additional_data_pkey",
DROP COLUMN "id_additional_data",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "additional_data_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "id_comment",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "publications" DROP CONSTRAINT "publications_pkey",
DROP COLUMN "id_publication",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "publications_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "additional_data" ADD CONSTRAINT "additional_data_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
