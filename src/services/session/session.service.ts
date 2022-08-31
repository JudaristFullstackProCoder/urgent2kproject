import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  USER_CREATED,
  USER_CREATED_SESSION_REGISTERED,
  USER_LOGIN,
  USER_LOGOUT,
} from '../../events/app.events';
import { User, UserDocument } from '../../users/entities/user.entity';

@Injectable()
export class SessionService {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent(USER_CREATED)
  handleUserCreatedEvent(session: Record<string, any>, data: UserDocument) {
    session['user'] = data;
    this.eventEmitter.emit(USER_CREATED_SESSION_REGISTERED);
  }

  @OnEvent(USER_LOGIN)
  handleUserLoginEvent(session: Record<string, any>, user: UserDocument) {
    session['user'] = user;
  }

  @OnEvent(USER_LOGOUT)
  handleUserLogoutEvent(session: Record<string, any>) {
    session['user'] = null;
  }
}
