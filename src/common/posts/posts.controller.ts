import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create new post' })
  @ApiBody({
    required: true,
    type: CreatePostDto,
    examples: {
      a: {
        summary: 'Create new post Body',
        value: {
          text: 'string',
        } as CreatePostDto,
      },
    },
  })
  @ApiCreatedResponse({ type: Posts })
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreatePostDto): Promise<Posts> {
    return this.postService.create(body);
  }
}
