// Message Class Model

export class Message {
  id: number;
  message: string;
  messagedate: Date;
  userid: number;
  username: string;
  channelid: number;
  channelname: string;

  constructor( id: number, message: string, messagedate: Date, userid: number, username: string, channelid: number, channelname: string ) {
    this.id = id;
    this.message = message;
    this.messagedate = messagedate;
    this.userid = userid;
    this.username = username;
    this.channelid = channelid;
    this.channelname = channelname;
  }
}
