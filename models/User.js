import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, unique: true },
  // otp: { type: String },
  isVerified: { type: Boolean, default: false },
  password: { type: String },

  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ["marketing", "financial", "super_admin"], default: "" },

  googleId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },

  lastSeen: { type: Date, default: Date.now() },

  profileImage: { type: String },
  amount: { type: String, default: 0 },
  referralCode: { type: String },
  referredBy: { type: String },
  transactions: [{
    TID: {
      type: String
    },
    OID: {
      type: String
    },
    amount: {
      type: Number
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING"
    },
    time: {
      type: Date,
      default: Date()
    }
  }
  ],
  // User Portfolio Schema
  portfolio: [
    {
      matchId: { type: String },
      playerId: { type: String }, // Reference to the player
      playerName: { type: String },
      team: { type: String }, // Team of the player
      initialPrice: { type: String },
      transactions: [
        {
          type: { type: String, enum: ["buy", "sell"] }, // Transaction type
          quantity: { type: Number }, // Number of stocks bought/sold
          price: { type: Number }, // Price per stock at transaction time
          timestamp: { type: Date, default: Date.now }, // When the transaction occurred
          autoSold: { type: Boolean, default: false }, // Whether it was auto-sold
          reason: { type: String } // Reason for auto-selling (out, innings complete, match complete)
        },
      ],
      currentHoldings: { type: Number }, // Current number of stocks held
    },
  ],
  // teamportfolio

  teamPortfolio: [
    {
      matchId: { type: String },
      teamId: { type: String }, // A unique identifier for the team
      teamName: { type: String },
      initialPrice: { type: String },
      transactions: [
        {
          type: { type: String, enum: ["buy", "sell"] },
          quantity: { type: Number },
          price: { type: Number },
          timestamp: { type: Date, default: Date.now },
          autoSold: { type: Boolean, default: false },
          reason: { type: String }
        },
      ],
      currentHoldings: { type: Number },
    },
  ]
});

const OtpRequestSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  otp: { type: String },

  // expiresAt: ISODate,
  // attempts: 0,
  // createdAt: ISODate
})

// const AdminSchema = new mongoose.Schema({
//   mobile: { type: String, unique: true },
//   isVerified: { type: Boolean, default: false }
// })

const User = mongoose.model("User", UserSchema);
const OtpRequest = mongoose.model("OTPrequest", OtpRequestSchema);
// const Admin = mongoose.model("Admin", AdminSchema);

export { User, OtpRequest };
