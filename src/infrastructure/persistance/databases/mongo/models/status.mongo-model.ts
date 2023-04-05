import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IStatusDomainEntity } from 'src/domain/entities/interfaces';

@Schema({ collection: 'status', versionKey: false })
export class StatusMongoModel implements IStatusDomainEntity {
  _id?: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;
}

export const StatusSchema = SchemaFactory.createForClass(StatusMongoModel);
export type StatusDocument = HydratedDocument<StatusMongoModel>;
