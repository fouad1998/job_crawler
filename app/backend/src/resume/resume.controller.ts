import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get('')
  async getResume() {
    const resume = await this.resumeService.getResume();
    if (!resume) {
      return { content: '' };
    }

    return resume;
  }

  @Post('update')
  addResume(@Body('content') content: string) {
    return this.resumeService.addResume(content);
  }
}
