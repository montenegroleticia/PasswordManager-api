import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto, userId: number) {
    return this.prisma.note.create({
      data: { ...createNoteDto, userId },
    });
  }

  getByUser(title: string, userId: number) {
    return this.prisma.note.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

  get(userId: number) {
    return this.prisma.note.findMany({
      where: { userId },
    });
  }

  getById(id: number) {
    return this.prisma.note.findFirst({
      where: { id },
    });
  }

  delete(id: number, userId: number) {
    return this.prisma.note.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
