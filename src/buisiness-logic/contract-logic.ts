import { Contract } from "../models/contract";

export const getContract = async (data) => {
    try {
        const { clientAddress, destinationCahin, collectionName } = data
        const res = await Contract.find({ clientAddress, destinationCahin, collectionName })
        if (res.length > 0) {
            return res;
        } else {
            return undefined;
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const postContract = async (data) => {
    try {
        const {
            clientAddress, destinationCahin, contractStandart,
            collectionName, tokenTicker, royalties, royaltiesPercentage,
            royaltiesAddress, targetMarketplace,
            chain, contractAddress, keepOriginalTokenIds,
            transferOnlyWithIds, ids, ownershipTransferd
        } = data

        const res = await Contract.create({
            clientAddress,
            destinationCahin,
            contractStandart,
            collectionName,
            tokenTicker,
            royalties,
            royaltiesPercentage,
            royaltiesAddress,
            targetMarketplace,
            departureDetailes: [{
                chain,
                contractAddress,
                keepOriginalTokenIds,//bool
                transferOnlyWithIds,//bool
                ids
            }],
            ownershipTransferd
        })
        return res;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const updateContract = async () => {
    try {

    } catch (error) {

    }
}

export const deleteContract = async () => {
    try {

    } catch (error) {

    }
}