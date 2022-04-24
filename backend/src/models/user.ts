import { Prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import Timestamp from './Timestamp';

export enum UserType {
  SUB_ADMIN = 'SUB_ADMIN',
}

export enum UserAccountStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  ACTIVE = 'ACTIVE',
};

@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
class User extends Timestamp {
  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true, type: String })
  public type: UserType;

  @Prop({ required: true, type: String })
  public accountStatus: UserAccountStatus;
}

const UserModel = getModelForClass(User);

export default UserModel;