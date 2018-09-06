// Message Class Model

export class Message {
  id: number;
  message: string;
  date: Date;
  userId: number;
  userName: string;
  channelId: number;
  channelName: string;

  constructor( id: number, message: string, date: Date, userId: number, userName: string, channelId: number, channelName: string ) {
    this.id = id;
    this.message = message;
    this.date = date;
    this.userId = userId;
    this.userName = userName;
    this.channelId = channelId;
    this.channelName = channelName;
  }
}
