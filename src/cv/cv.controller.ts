import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, JwtAuthGuard, UserIdentity } from 'src/auth/guards/jwt-auth.guard';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CvController {
  constructor(private readonly cvService: CvService) { }

  @Post()
  create(
    @Body() createCvDto: CreateCvDto,
    @CurrentUser() user: UserIdentity,
  ) {
    return this.cvService.create(user, createCvDto);
  }

  @Get()
  findAll(
    @CurrentUser() user: UserIdentity
  ) {
    return this.cvService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserIdentity) {
    return this.cvService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @CurrentUser() user: UserIdentity,
  ) {
    return this.cvService.update(+id, updateCvDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: UserIdentity,
  ) {
    return this.cvService.remove(+id, user);
  }
}
