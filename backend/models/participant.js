import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username1: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  username2: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  password: {
    type: String,
    default: null
  },
  contest: {
    isParticipating: {
      type: Boolean,
      default: false
    },
    startTime: {
      type: Date,
      default: null
    },
    duration: {
      type: Number,
      default: null
    },
    endTime: {
      type: Date,
      default: null
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});




userSchema.methods.compareGeneratedPassword = function(userInput) {
  return this.password === userInput;
};


// userSchema.methods.getContestTimeRemaining = function() {
//   if (!this.contest.isParticipating || !this.contest.endTime) {
//     return 0;
//   }
//   const now = new Date();
//   const end = new Date(this.contest.endTime);
//   const timeLeftMs = end - now;
//   return timeLeftMs <= 0 ? 0 : Math.ceil(timeLeftMs / 60000);
// };


// userSchema.pre('save', function(next) {
//   if (this.isModified('contest.startTime') && this.contest.duration) {
//     this.contest.endTime = new Date(this.contest.startTime.getTime() + this.contest.duration * 60000);
//   }
//   next();
// });


const User = mongoose.model('User', userSchema);

export default User;