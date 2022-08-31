import { EventEmitter2 } from '@nestjs/event-emitter';
import UsersRepository from './users.repository';

export class UserSubscriber {
  constructor(
    private eventEmitter: EventEmitter2,
    private userRepository: UsersRepository,
  ) {}
  async handleStoreDeletionByRemovingSubscriptions(
    storeId: string,
    shopkeeperId: string,
  ) {
    await this.userRepository.userModel.updateMany(
      {},
      {
        $pull: {
          subscriptions: storeId,
        },
      },
    );
  }
}
