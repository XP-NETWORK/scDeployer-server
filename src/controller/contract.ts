import { Contract } from "../models/contract";
import { Router } from "express";
import { getContract, postContract, addDeparture, sendMarketPlace } from "../buisiness-logic/contract-logic"

export const contractRouter = () => {
    const router = Router();

    router.get("/contract", async (req, res) => {
        try {
            const { clientAddress, destinationCahin, collectionName } = req.query
            if (!clientAddress || !destinationCahin || !collectionName) {
                res.status(404).send("undefined address")
            } else {
                const resonse = await getContract(req.query)
                if (resonse) {
                    res.status(200).send(resonse)
                } else {
                    res.status(404).send("Contract Not Found")
                }
            }
        } catch (error) {

        }
    });

    router.post("/contract", async (req, res) => {
        try {
            const { clientAddress } = req.body
            if (!clientAddress) {
                res.status(404).send("undefined address")
            } else {
                const resonse = await postContract(req.body)
                if (resonse) {
                    console.log(resonse);
                    res.status(200).send(resonse)
                }
            }
        } catch (error) {
            console.log(error);
            res.status(404).send("error")
        }
    });

    router.post("/telegramMarketplace", async (req, res) => {
        try {
            const { clientAddress, marketplace, destinationCahin,createdMarketplace ,mintNft  } = req.body
            if (!clientAddress || !destinationCahin) {
                res.status(404).send("undefined address")
            } else {
                const resonse = await sendMarketPlace(`Marketplace settings \n Client: ${clientAddress} \n MarketPlace: ${marketplace}`, clientAddress, marketplace, destinationCahin ,createdMarketplace ,mintNft)
                if (resonse) {
                    console.log(resonse.result?.text);
                    res.status(200).send(resonse.result?.text)
                }
            }
        } catch (error) {
            console.log(error);
            res.status(404).send("error")
        }
    });

    router.patch("/addDeparture", async (req, res) => {
        try {
            const { clientAddress, destinationCahin } = req.body
            if (!clientAddress || !destinationCahin) {
                res.status(404).send("undefined clientAddress or destinationCahin")
            } else {
                const resonse = await addDeparture(req.body)
                if (resonse) {
                    console.log(resonse);
                    res.status(200).send(resonse)
                }
            }
        } catch (error) {
            console.log(error);
            res.status(404).send("error")
        }
    });

    router.delete("/contract", (req, res) => {
        try {

        } catch (error) {

        }
    });

    return router;
};
