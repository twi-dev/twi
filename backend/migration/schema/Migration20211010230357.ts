import { Migration } from '@mikro-orm/migrations';

export class Migration20211010230357 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `file` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `key` varchar(255) not null, `name` varchar(255) not null, `hash` char(128) not null, `mime` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `file` add unique `file_key_unique`(`key`);');

    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `login` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `role` enum(\'root\', \'admin\', \'regular\') not null, `status` enum(\'inactive\', \'active\', \'banned\', \'suspended\') not null, `avatar_id` int(11) unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_login_unique`(`login`);');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');
    this.addSql('alter table `user` add index `user_avatar_id_index`(`avatar_id`);');
    this.addSql('alter table `user` add unique `user_avatar_id_unique`(`avatar_id`);');

    this.addSql('create table `story` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `publisher_id` int(11) unsigned not null, `cover_id` int(11) unsigned null, `title` varchar(255) not null, `description` text not null, `slug` varchar(255) not null, `is_draft` tinyint(1) not null, `is_finished` tinyint(1) not null, `chapters_count` smallint not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `story` add index `story_publisher_id_index`(`publisher_id`);');
    this.addSql('alter table `story` add index `story_cover_id_index`(`cover_id`);');
    this.addSql('alter table `story` add unique `story_cover_id_unique`(`cover_id`);');
    this.addSql('alter table `story` add unique `story_slug_unique`(`slug`);');

    this.addSql('create table `chapter` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `story_id` int(11) unsigned not null, `number` smallint null, `title` varchar(255) not null, `description` text null, `text` mediumtext not null, `is_draft` tinyint(1) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `chapter` add index `chapter_story_id_index`(`story_id`);');

    this.addSql('create table `category` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `name` varchar(255) not null, `prefix` varchar(255) not null, `order` smallint unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `category` add unique `category_name_unique`(`name`);');
    this.addSql('alter table `category` add unique `category_prefix_unique`(`prefix`);');

    this.addSql('create table `tag` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `category_id` int(11) unsigned null, `name` varchar(255) not null, `slug` varchar(255) not null, `description` text null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `tag` add index `tag_category_id_index`(`category_id`);');
    this.addSql('alter table `tag` add unique `tag_name_unique`(`name`);');
    this.addSql('alter table `tag` add unique `tag_slug_unique`(`slug`);');

    this.addSql('create table `story_tags` (`story_id` int(11) unsigned not null, `tag_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `story_tags` add index `story_tags_story_id_index`(`story_id`);');
    this.addSql('alter table `story_tags` add index `story_tags_tag_id_index`(`tag_id`);');
    this.addSql('alter table `story_tags` add primary key `story_tags_pkey`(`story_id`, `tag_id`);');

    this.addSql('alter table `user` add constraint `user_avatar_id_foreign` foreign key (`avatar_id`) references `file` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `story` add constraint `story_publisher_id_foreign` foreign key (`publisher_id`) references `user` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `story` add constraint `story_cover_id_foreign` foreign key (`cover_id`) references `file` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `chapter` add constraint `chapter_story_id_foreign` foreign key (`story_id`) references `story` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `tag` add constraint `tag_category_id_foreign` foreign key (`category_id`) references `category` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `story_tags` add constraint `story_tags_story_id_foreign` foreign key (`story_id`) references `story` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `story_tags` add constraint `story_tags_tag_id_foreign` foreign key (`tag_id`) references `tag` (`id`) on update cascade on delete cascade;');
  }

}
