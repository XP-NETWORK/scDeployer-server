import mongoose from "mongoose";
const Schema = mongoose.Schema;

let ContractSchema = new Schema(
    {
        clientAddress: { type: String, required: true },
        destinationCahin: { type: String , default: ""},
        contractStandart: { type: String, default: ""},
        collectionName: { type: String , default: ""},
        tokenTicker: { type: String , default: ""},
        royalties: { type: String, default: "" },//bool
        royaltiesPercentage: { type: String, default: "" },
        royaltiesAddress: { type: String , default: ""},
        targetMarketplace: { type: String , default: ""},
        departureDetailes: [{
            chain: { type: String , default: ""},
            contractAddress: { type: String , default: ""},
            keepOriginalTokenIds: { type: String , default: ""},//bool
            transferOnlyWithIds: { type: String , default: ""},//bool
            ids: []
        }],
        ownershipTransferd: { type: String , default: ""},//bool
        cretatedAt: { type: Date, default: Date.now() }
    },
    { collection: "contracts", versionKey: false }
);

export const Contract = mongoose.model("Deposit", ContractSchema);
