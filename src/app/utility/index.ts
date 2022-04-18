import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {
  AWS_REGION,
  AWS_SECRET_KEY,
  AWS_ACCESS_KEY,
} from '../../core/environment';

@Injectable()
export class UtilityService {
  async addDataInEventBus(
    detail: Record<string, any>,
    detailType: string,
    eventBus: string,
    source: string,
  ) {
    const eventBridge = new AWS.EventBridge({
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
    });

    const params = {
      Entries: [
        {
          Detail: JSON.stringify(detail),
          DetailType: detailType,
          EventBusName: eventBus,
          Source: source,
        },
      ],
    };

    await eventBridge.putEvents(params).promise();
  }
}
