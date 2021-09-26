import { UniqueIdentifier } from '@/types';

export default class DeleteUserRequest {
  constructor(public id: UniqueIdentifier) {}
}
