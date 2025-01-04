import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {}

  getResume() {
    return this.prisma.resume.findFirst({
      orderBy: [{ created_at: 'desc' }],
    });
  }

  addResume(content: string) {
    return this.prisma.resume.create({
      data: {
        content,
      },
    });
  }
}
