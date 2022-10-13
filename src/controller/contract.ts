import { Contract } from "../models/contract";
import { Router } from "express";

export const contractRouter = () => {
    const router = Router();

    router.get("/contract", async (req, res) => {
        try {
            console.log("got here");

        } catch (error) {

        }
    });

    router.post("/contract", async (req, res) => {
        try {

        } catch (error) {

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
