-- CreateTable
CREATE TABLE "publications" (
    "id" SERIAL NOT NULL,
    "preview" TEXT,
    "text" TEXT,
    "photo" TEXT,
    "description" TEXT,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additional_data" (
    "id" SERIAL NOT NULL,
    "id_user" TEXT NOT NULL,
    "name" TEXT,
    "link" TEXT,
    "tags" TEXT,
    "state" TEXT NOT NULL DEFAULT 'Черновик',
    "repost" TEXT,
    "original_id_user" TEXT,
    "original_id_publication" TEXT,
    "data_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_publication" TIMESTAMP(3) NOT NULL,
    "publication_id" INTEGER NOT NULL,

    CONSTRAINT "additional_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "data_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publication_id" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "additional_data_publication_id_key" ON "additional_data"("publication_id");

-- AddForeignKey
ALTER TABLE "additional_data" ADD CONSTRAINT "additional_data_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
