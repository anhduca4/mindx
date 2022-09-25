import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserIdentity } from 'src/auth/guards/jwt-auth.guard';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly repo: Repository<Cv>,
  ) { }
  create(user: UserIdentity, payload: CreateCvDto) {
    const cv = new Cv();
    cv.userId = user.userId;
    cv.description = payload.description;
    cv.name = payload.name;
    cv.mobile = payload.mobile;
    cv.github = payload.github;
    cv.linkin = payload.linkin;

    return this.repo.save(cv);
  }

  findAll(user: UserIdentity) {
    const where: any = {};
    if (!user.isAdmin) {
      where.userId = user.userId;
    }
    return this.repo.find({
      where,
    });
  }

  async findOne(id: number, user: UserIdentity) {
    const where: any = {
      id,
    };
    if (!user.isAdmin) {
      where.userId = user.userId;
    }
    const cv = await this.repo.findOneBy(where);
    if (!cv) {
      throw new NotFoundException('Can not found CV');
    }
    return cv;
  }

  async update(id: number, payload: UpdateCvDto, user: UserIdentity) {
    const where: any = {
      id,
    };
    if (!user.isAdmin) {
      where.userId = user.userId;
    }
    const cv = await this.repo.findOneBy(where);
    if (!cv) {
      throw new NotFoundException('Can not found CV');
    }
    cv.name = payload.name;
    cv.description = payload.description;
    cv.mobile = payload.mobile;
    cv.github = payload.github;
    cv.linkin = payload.linkin;
    return this.repo.save(cv);
  }

  async remove(id: number, user: UserIdentity) {

    const where: any = {
      id,
    };
    if (!user.isAdmin) {
      where.userId = user.userId;
    }
    await this.repo.delete(where);
    return {
      success: true,
    };
  }
}
