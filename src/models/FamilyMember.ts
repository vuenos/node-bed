import mongoose, {Document, Schema} from 'mongoose';

export interface IFamilyMember {
  name: string;
  age: number;
  relation:
    | '아버지'
    | '어머니'
    | '남편'
    | '아내'
    | '아들'
    | '딸'
    | '형제/자매'
    | '기타';
  gender: string;
  phoneNumber?: string;
  birthdate?: string;
  address?: string;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFamilyMemberDocument extends IFamilyMember, Document {}

const FamilyMemberSchema: Schema = new Schema<IFamilyMemberDocument>({
  name: {
    type: String,
    required: [true, '이름은 필수 입력 항목입니다.'],
  },
  age: {
    type: Number,
    required: [true, '나이는 필수 입력 항목입니다.'],
    min: [0, '나이는 0보다 커야 합니다'],
  },
  relation: {
    type: String,
    required: [true, '관계는 필수 선택 항목입니다.'],
    enum: [
      '아버지',
      '어머니',
      '남편',
      '아내',
      '아들',
      '딸',
      '형제/자매',
      '기타',
    ],
  },
  phoneNumber: {
    type: String,
    match: [/^\d{2,3}-\d{3,4}-\d{4}$/, '유효한 전화번호 형식이 아닙니다.'],
  },
  birthdate: {
    type: String,
  },
  address: {
    type: String,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically updates updatedAt when modified
FamilyMemberSchema.pre('findOneAndUpdate', function () {
  this.set({updatedAt: new Date()});
});

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema);
export default FamilyMember;
