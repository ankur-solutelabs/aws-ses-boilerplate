import { Body, Controller, Post } from '@nestjs/common';
import { UserEmailDto } from './dto';
import { EmailService } from './email.service';

@Controller('send')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('email')
  async sendMail(@Body() user: UserEmailDto) {
    return this.emailService.sendMail(user);
  }
}
