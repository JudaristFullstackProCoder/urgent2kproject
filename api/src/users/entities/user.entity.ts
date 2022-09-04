import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type UserDocument = User & Document<string>;

@Schema({
  skipVersioning: { ["__v"]: false },
  autoIndex: true,
  minimize: false,
  toObject: {
    versionKey: false,
  },
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    text: true,
  })
  name: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    text: true,
  })
  surname: string;
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed, immutable: true })
  country: Record<string, unknown>;
  @Prop({ required: true, type: mongoose.Schema.Types.String, immutable: true })
  city: Record<string, unknown>;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.Number,
    default: 5000,
  })
  amount: number;
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  email: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    select: true,
  })
  password: string;
  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  birthdate: string;
  @Prop({ required: true, type: mongoose.Schema.Types.Number, default: 0 })
  received: number;
  @Prop({ required: true, type: mongoose.Schema.Types.Number, default: 0 })
  sent: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
