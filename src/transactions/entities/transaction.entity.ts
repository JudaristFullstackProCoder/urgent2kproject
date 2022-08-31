import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type TransactionDocument = Transaction & Document<string>;

@Schema({
    skipVersioning: { ['__v']: false },
    autoIndex: true,
    minimize: false,
    toObject: {
      versionKey: false,
    },
    timestamps: true,
  })
export class Transaction {
    @Prop({ type: mongoose.Schema.Types.String, ref: 'users' })
    sender: string;
    @Prop({ type: mongoose.Schema.Types.String, ref: 'users' })
    receiver: string;
    @Prop({ type: mongoose.Schema.Types.String })
    from: string;
    @Prop({ type: mongoose.Schema.Types.String })
    to: string;
    @Prop({ required: true, type: mongoose.Schema.Types.Number, max: 5000 })
    amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
