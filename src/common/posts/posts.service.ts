import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private postRepository: Repository<Posts>) {}

  async create(body: CreatePostDto, userId: number): Promise<Posts> {
    const post = await this.postRepository.create({ ...body, userId });

    return this.postRepository.save(post);
  }

  async getById(id: number): Promise<Posts> {
    const post = await this.postRepository.findOne(id, { where: { isDeleted: false } });

    if (!post) {
      throw new HttpException({ error: 'Post not found' }, HttpStatus.BAD_REQUEST);
    }

    return post;
  }
}
