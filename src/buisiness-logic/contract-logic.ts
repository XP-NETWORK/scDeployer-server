import { Contract } from "../models/contract";
import "dotenv/config";
import axios from "axios";

export const chainToNonce: any = {
    "Ethereum": "5",
    "BSC": "4",
    "Avalanche": "6",
    "Polygon": "7",
    "Fantom": "8",
    "Harmony": "12",
    "Gnosis": "14",
    "Fuse": "16",
    "Velas": "19",
    "Aurora": "21",
    "GateChain": "23",
};

export const getContract = async (data) => {
    try {
        const { destinationAddress, destinationCahin ,clientAddress } = data
        const res = await Contract.find({ destinationAddress, destinationCahin ,clientAddress })
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
            royaltiesAddress, destinationAddress
        } = data

        const res = await Contract.create({
            clientAddress,
            destinationCahin,
            destinationAddress,
            contractStandart,
            collectionName,
            tokenTicker,
            royalties,
            royaltiesPercentage,
            royaltiesAddress,
        })
        if (res) return res; else return undefined;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const addDeparture = async (data) => {
    try {
        const { departureDetailes, clientAddress, destinationCahin, destinationAddress } = data
        const res = await Contract.updateOne({ clientAddress, destinationCahin },
            { $push: { departureDetailes: { $each: departureDetailes } } }, { new: true, fields: "departureDetailes" }).exec()
        let str = ''
        let ids = ``
        let num = 1
        for (let item of departureDetailes) {
            str = str + `%0ADeparture addres: ${item.contractAddress} %0A<strong>${item.chain} -${chainToNonce[item.chain]}</strong>%0A`
            ids = ids + `%0A${num}:%0AKeep Original Token Ids: ${item.keepOriginalTokenIds}%0ATransfer Only With Ids: ${item.transferOnlyWithIds}%0A${JSON.stringify(item.ids)}%0A`
            num++;
        }

        const msg = `${str}%0ATarget contract : ${destinationAddress} %0A<strong>${destinationCahin} -${chainToNonce[destinationCahin]}</strong>%0A%0A-------------------------Departure Details---------------------%0AClient Address:${clientAddress}%0A%0A<strong>Details:</strong> ${ids}%0A`
        const telegramRes = await axios.get(`https://api.telegram.org/bot${process.env.MAPPING_TELEGRAM_BOT}/sendMessage?chat_id=${process.env.MAPPING_TELEGRAM_CHAT}&text=${msg}&parse_mode=HTML`);
        console.log(telegramRes.data);

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

export const sendMarketPlace = async (msg: string, clientAddress, marketplace, destinationCahin, createdMarketplace, mintNft) => {
    try {
        console.log("before telegram operation")
        const res = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT}&text=${msg}&parse_mode=HTML`);
        const resp = await Contract.updateOne({ clientAddress, destinationCahin },
            { $set: { targetMarketplace: marketplace, createdMarketplace, mintNft } }, { new: true, fields: "targetMarketplace" }).exec()
        return res.data
    } catch (err: any) {
        console.log(err.message)
        return undefined;
    }
}