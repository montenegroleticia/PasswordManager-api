import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsRepository {
  private secret = process.env.CRYPTR_SECRET;
  private Cryptr = require('cryptr');
  private cryptr = new this.Cryptr(this.secret);
  constructor(private readonly prisma: PrismaService) {}

  create(createCardDto: CreateCardDto, userId: number) {
    return this.prisma.card.create({
      data: {
        ...createCardDto,
        password: this.cryptr.encrypt(createCardDto.password),
        cvv: this.cryptr.encrypt(createCardDto.cvv),
        userId,
      },
    });
  }

  getByUser(title: string, userId: number) {
    return this.prisma.card.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

  get(userId: number) {
    return this.prisma.card.findMany({
      where: { userId },
    });
  }

  getById(id: number) {
    return this.prisma.card.findFirst({
      where: { id },
    });
  }

  delete(id: number, userId: number) {
    return this.prisma.card.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
