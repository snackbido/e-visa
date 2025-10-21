import { Blog } from '@visa/blog/entity/blog.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'json' })
  content: {
    type: string;
    text?: string;
    url?: string;
    caption?: string;
  };

  @Column()
  image_url: string;

  @Column()
  description: string;

  @ManyToOne(() => Blog, (blog) => blog.articles, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @Column()
  blog_id: string;

  @Column()
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
