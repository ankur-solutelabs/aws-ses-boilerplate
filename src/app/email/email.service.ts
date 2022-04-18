import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk';
import { UserEmailDto } from './dto';

@Injectable()
export class EmailService {
  private SESconfig;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.SESconfig = {
      apiVersion: '2010-12-01',
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    };
  }

  async sendMail(user: UserEmailDto) {
    const source = 'username@solutelabs.com';
    const params = {
      Destination: {
        CcAddresses: [],
        ToAddresses: [`${user.email}`],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<div>
                   <h3>Hi ${user.name} !</h3><br/>
                   <p>This Email You Are Receiving is From Amazon SES Email Service.</p>
                   </div>`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Email Service',
        },
      },
      Source: `${source}`,
      ReplyToAddresses: [`${source}`],
    };
    return await this.awsMailSend(params);
  }

  async awsMailSend(params: any) {
    new AWS.SES(this.SESconfig)
      .sendEmail(params)
      .promise()
      .then((res) => {
        console.log(res);
      });
  }
}
