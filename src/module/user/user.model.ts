import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


const UserSchema = new Schema<IUser>({
 
  name: { 
    type: String, required: true
   },
   email: { 
    type: String,
     required: true, 
     unique: true 
    },
  password: { 
    type: String,
     required: true 
    },
  role: { 
    type: String, 
    enum: ['student', 'teacher'], 
    required: true 
  },


},{timestamps: true});


UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});


export const UserModel = model<IUser>('User', UserSchema);
