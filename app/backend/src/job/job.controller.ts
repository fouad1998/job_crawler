import { Controller, Get, Param, Put } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get()
  getJobs() {
    return this.jobService.getJobs();
  }

  @Put('applied/:id')
  markApplied(@Param('id') id: string) {
    return this.jobService.markApplied(parseInt(id));
  }

  //   @Get('/:userId')
  //   // localhost:3000/users/3000
  //   getUser(@Param('userId') userId: string) {
  //     return this.userService.getUser({
  //       userId,
  //     });
  //   }

  //   @UseGuards(JwtAuthGuard)
  //   @UseInterceptors(FileInterceptor('avatar'))
  //   @Post()
  //   async updateUser(
  //     @Req() requestWithUser: RequestWithUser,
  //     @UploadedFile() file: Express.Multer.File,
  //   ) {
  //     console.log({ file });
  //     const submittedFile = fileSchema.parse(file);
  //     return this.userService.updateUser({
  //       userId: requestWithUser.user.userId,
  //       submittedFile,
  //     });
  //   }
}
