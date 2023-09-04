import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CredentialsRepository {
  private secret = process.env.CRYPTR_SECRET;
  private Cryptr = require('cryptr');
  private cryptr = new this.Cryptr(this.secret);
  constructor(private readonly prisma: PrismaService) {}

  getCredentialUser(title: string, userId: number) {
    return this.prisma.credential.findFirst({
      where: {
        userId,
        title,
      },
    });
  }

  create(createCredentialDto: CreateCredentialDto, userId) {
    return this.prisma.credential.create({
      data: {
        ...createCredentialDto,
        password: this.cryptr.encrypt(createCredentialDto.password),
        userId,
      },
    });
  }

  findAll() {
    return this.prisma.credential.findMany();
  }

  findOne(id: number) {
    const credential = this.prisma.credential.findFirst({ where: { id } });
    if (!credential) {
      throw new HttpException('Credential not found', HttpStatus.NOT_FOUND);
    }
    return credential;
  }

  remove(id: number) {
    this.findOne(id);
    return this.prisma.credential.delete({ where: { id } });
  }
}
