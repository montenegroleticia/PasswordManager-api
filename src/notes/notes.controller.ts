import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @User() user) {
    const { id } = user;

    return this.service.create(createNoteDto, id);
  }

  @Get()
  get(@User() user) {
    console.log(user);
    const { id } = user;
    return this.service.get(id);
  }

  @Get(':id')
  getByUserId(@Param('id', ParseIntPipe) id: string, @User() user) {
    const userId = user.id;

    return this.service.getById(+id, userId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string, @User() user) {
    const userId = user.id;

    return this.service.delete(+id, userId);
  }
}
