import { UniqueIdentifier } from '@/types';

export default class GetUserByIdRequest {
  constructor(public id: UniqueIdentifier) {}
}
