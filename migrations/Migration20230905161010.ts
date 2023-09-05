import { Migration } from '@mikro-orm/migrations';

export class Migration20230905161010 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `category` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `name` varchar(255) not null, `slug` varchar(255) not null, `order` smallint unsigned not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `category` add unique `category_name_unique`(`name`);');
    this.addSql('alter table `category` add unique `category_slug_unique`(`slug`);');

    this.addSql('create table `tag` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `name` varchar(255) not null, `slug` varchar(255) not null, `description` text null default null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `tag` add unique `tag_slug_unique`(`slug`);');

    this.addSql('create table `tag_category` (`tag_id` varchar(36) not null, `category_id` varchar(36) not null, primary key (`tag_id`, `category_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `tag_category` add index `tag_category_tag_id_index`(`tag_id`);');
    this.addSql('alter table `tag_category` add index `tag_category_category_id_index`(`category_id`);');

    this.addSql('create table `user` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `login` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `role` enum(\'owner\', \'admin\', \'regular\') not null default \'regular\', `status` enum(\'inactive\', \'active\', \'suspended\') not null default \'inactive\', primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_login_unique`(`login`);');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');

    this.addSql('create table `story` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `title` varchar(255) not null, `description` text not null, `slug` varchar(255) not null, `is_draft` tinyint(1) not null default true, `is_finished` tinyint(1) not null default false, `chapters_count` smallint unsigned not null default 0, `publisher_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `story` add unique `story_slug_unique`(`slug`);');
    this.addSql('alter table `story` add index `story_publisher_id_index`(`publisher_id`);');

    this.addSql('create table `story_tags` (`story_id` varchar(36) not null, `tag_id` varchar(36) not null, primary key (`story_id`, `tag_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `story_tags` add index `story_tags_story_id_index`(`story_id`);');
    this.addSql('alter table `story_tags` add index `story_tags_tag_id_index`(`tag_id`);');

    this.addSql('create table `chapter` (`id` varchar(36) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `title` varchar(255) not null, `description` text not null, `content` json not null, `is_draft` tinyint(1) not null default false, `order` smallint unsigned null, `slug` varchar(255) not null, `story_id` varchar(36) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `chapter` add unique `chapter_slug_unique`(`slug`);');
    this.addSql('alter table `chapter` add index `chapter_story_id_index`(`story_id`);');

    this.addSql('alter table `tag_category` add constraint `tag_category_tag_id_foreign` foreign key (`tag_id`) references `tag` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `tag_category` add constraint `tag_category_category_id_foreign` foreign key (`category_id`) references `category` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `story` add constraint `story_publisher_id_foreign` foreign key (`publisher_id`) references `user` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `story_tags` add constraint `story_tags_story_id_foreign` foreign key (`story_id`) references `story` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `story_tags` add constraint `story_tags_tag_id_foreign` foreign key (`tag_id`) references `tag` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `chapter` add constraint `chapter_story_id_foreign` foreign key (`story_id`) references `story` (`id`) on update cascade on delete cascade;');
  }

}
