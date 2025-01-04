import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}
  async getJobs() {
    return this.prisma.links.findMany({
      orderBy: [
        {
          visited: 'desc',
        },
        {
          checked: 'asc',
        },
        {
          qualified: 'desc',
        },
        {
          mark: 'desc',
        },
        {
          created_at: 'desc',
        },
      ],
    });
  }

  async markApplied(id: number) {
    return this.prisma.links.update({
      where: {
        id,
      },
      data: {
        checked: true,
      },
    });
  }
}
