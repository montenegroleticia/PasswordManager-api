import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(private readonly repository: CredentialsRepository) {}

  async create(createCredentialDto: CreateCredentialDto, userId: number) {
    const checkCredential = await this.repository.getCredentialUser(
      createCredentialDto.title,
      userId,
    );
    if (checkCredential) {
      throw new ConflictException('This title already exists!');
    }
    return await this.repository.create(createCredentialDto, userId);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async remove(id: number) {
    return await this.repository.remove(id);
  }
}
