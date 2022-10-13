import mongoose from "mongoose";
const Schema = mongoose.Schema;

let ContractSchema = new Schema(
    {
        clientAddress: { type: String, required: true },
        destinationCahin: { type: String },
        contractStandart: { type: String },
        collectionName: { type: String },
        tokenTicker: { type: String },
        royalties: { type: String },//bool
        royaltiesPercentage: { type: String },
        royaltiesAddress: { type: String },
        targetMarketplace: { type: String },
        departureDetailes: [{
            chain: { type: String },
            contractAddress: { type: String },
            keepOriginalTokenIds: { type: String },//bool
            transferOnlyWithIds: { type: String },//bool
            ids: []
        }],
        ownershipTransferd: { type: String },//bool
        cretatedAt: { type: Date, default: Date.now() }
    },
    { collection: "contracts", versionKey: false }
);

export const Contract = mongoose.model("Deposit", ContractSchema);
