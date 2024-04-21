import mongoose, { Schema, Types, model } from "mongoose";

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    avatar: {
      public_id: {
        type: String,
        
    },
    url: {
        type: String,
        
    }
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export  const Chat = mongoose.models.Chat || model("Chat", chatSchema);
