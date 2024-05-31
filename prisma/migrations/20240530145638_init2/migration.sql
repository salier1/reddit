-- CreateTable
CREATE TABLE `Subreddit` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `creatorId` VARCHAR(191) NULL,

    UNIQUE INDEX `Subreddit_name_key`(`name`),
    INDEX `Subreddit_name_idx`(`name`),
    INDEX `Subreddit_creatorId_idx`(`creatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `userId` VARCHAR(191) NOT NULL,
    `subredditId` VARCHAR(191) NOT NULL,

    INDEX `Subscription_subredditId_idx`(`subredditId`),
    PRIMARY KEY (`userId`, `subredditId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `subredditId` VARCHAR(191) NOT NULL,

    INDEX `Post_authorId_idx`(`authorId`),
    INDEX `Post_subredditId_idx`(`subredditId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authorId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `replyToId` VARCHAR(191) NULL,
    `commentId` VARCHAR(191) NULL,

    INDEX `Comment_replyToId_idx`(`replyToId`),
    INDEX `Comment_postId_idx`(`postId`),
    INDEX `Comment_authorId_idx`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `userId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `type` ENUM('UP', 'DOWN') NOT NULL,

    INDEX `Vote_postId_idx`(`postId`),
    PRIMARY KEY (`userId`, `postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentVote` (
    `userId` VARCHAR(191) NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,
    `type` ENUM('UP', 'DOWN') NOT NULL,

    INDEX `CommentVote_commentId_idx`(`commentId`),
    PRIMARY KEY (`userId`, `commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
