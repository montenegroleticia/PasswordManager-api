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
import { CardsService } from './cards.service';
import { User } from '../decorators/user.decorator';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto, @User() user) {
    const { id } = user;

    return this.cardsService.create(createCardDto, id);
  }

  @Get()
  get(@User() user) {
    console.log(user);
    const { id } = user;
    return this.cardsService.get(id);
  }

  @Get(':id')
  getByUserId(@Param('id', ParseIntPipe) id: string, @User() user) {
    const userId = user.id;

    return this.cardsService.getById(+id, userId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string, @User() user) {
    const userId = user.id;

    return this.cardsService.delete(+id, userId);
  }
}
