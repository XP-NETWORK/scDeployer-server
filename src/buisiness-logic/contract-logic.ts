import { Contract } from "../models/contract";
import "dotenv/config";
import axios from "axios";

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
            royaltiesAddress, targetMarketplace, departureDetailes, ownershipTransferd
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
            departureDetailes,
            ownershipTransferd
        })
        if (res) return res; else return undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const addDeparture = async (data) => {
    try {
        const { departureDetailes, clientAddress, destinationCahin } = data
        const res = await Contract.updateOne({ clientAddress, destinationCahin },
            { $push: { departureDetailes: { $each: departureDetailes } } }, { new: true, fields: "departureDetailes" }).exec()
        const telegramRes = await axios.get(`https://api.telegram.org/bot${process.env.MAPPING_TELEGRAM_BOT}/sendMessage?chat_id=${process.env.MAPPING_TELEGRAM_CHAT}&text=${departureDetailes}&parse_mode=HTML`);
        if (res) return res; else return undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const deleteContract = async () => {
    try {

    } catch (error) {

    }
}

export const sendMarketPlace = async (msg: string, clientAddress, marketplace, destinationCahin) => {
    try {
        console.log("before telegram operation")
        const res = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT}&text=${msg}&parse_mode=HTML`);
        const resp = await Contract.updateOne({ clientAddress, destinationCahin },
            { $set: { targetMarketplace: marketplace } }, { new: true, fields: "targetMarketplace" }).exec()
        return res.data
    } catch (err: any) {
        console.log(err.message)
        return undefined;
    }
}