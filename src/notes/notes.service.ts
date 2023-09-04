import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly repository: NotesRepository) {}

  async create(createNoteDto: CreateNoteDto, userId: number) {
    const checkNote = await this.repository.getByUser(
      createNoteDto.title,
      userId,
    );
    if (checkNote) throw new ConflictException('This title already exists!');

    return this.repository.create(createNoteDto, userId);
  }

  async get(userId: number) {
    return this.repository.get(userId);
  }

  async getById(id: number, userId: number) {
    const note = await this.repository.getById(id);

    if (!note) throw new NotFoundException();
    if (note.userId !== userId) throw new ForbiddenException();

    return note;
  }

  async delete(id: number, userId: number) {
    const Note = await this.repository.getById(id);

    if (!Note) throw new NotFoundException();
    if (Note.userId !== userId) throw new ForbiddenException();

    return this.repository.delete(id, userId);
  }
}
