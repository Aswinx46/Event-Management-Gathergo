export type ObjectId = string;

export interface UserInfo {
  _id: ObjectId | string;
  name: string;
  profileImage: string;
}

export interface ChatEntityDTO {
  _id?: ObjectId;
  lastMessage: string;
  lastMessageAt: string;
  senderId: ObjectId | string | UserInfo;
  receiverId: ObjectId | string | UserInfo;
  senderModel: 'client' | 'vendors';
  receiverModel: 'client' | 'vendors';
}

export interface FormattedChat {
  _id?: ObjectId;
  lastMessage: string;
  lastMessageAt: string;
  contact: UserInfo;
  model: 'client' | 'vendors';
}