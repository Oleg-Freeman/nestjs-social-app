import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/auth.guard';
import { IdParamDto } from '../../resources/id-param.dto';
import { User } from '../auth/auth.decorator';
import { AuthDto } from '../auth/auth.dto';

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
  async create(@Body() body: CreatePostDto, @User() user: AuthDto): Promise<Posts> {
    return this.postService.create(body, user.userId);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiParam({
    name: 'id',
    description: 'post id',
    allowEmptyValue: false,
    example: 1,
  })
  @ApiCreatedResponse({ type: Posts })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param() params: IdParamDto): Promise<Posts> {
    return this.postService.getById(params.id);
  }
}
