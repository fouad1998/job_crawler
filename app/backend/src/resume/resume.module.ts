import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  providers: [ResumeService, PrismaService],
  controllers: [ResumeController],
})
export class ResumeModule {}
