import { Contract } from "../models/contract";
import { Router } from "express";
import { getContract, postContract, updateContract, deleteContract } from "../buisiness-logic/contract-logic"

export const contractRouter = () => {
    const router = Router();

    router.get("/contract", async (req, res) => {
        try {




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
            res.status(404).send("error")
        }
    });

    router.patch("/contract", async (req, res) => {
        try {

        } catch (error) {

        }
    });

    router.delete("/contract", (req, res) => {
        try {

        } catch (error) {

        }
    });

    return router;
};
