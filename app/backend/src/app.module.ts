import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JobModule } from './job/job.module';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to your static files folder
      exclude: ['/api/(.*)'],
    }),
    ScheduleModule.forRoot(),
    JobModule,
    ResumeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
