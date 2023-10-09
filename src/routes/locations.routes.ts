import { Router } from "express";
import {
    addLocation,
    getAllLocationsByCountry,
    getGlobalLocations,
} from "../controllers/locations.controllers";
import Auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.post("/add-location", Auth, addLocation);

router.get("/get-by-country", getAllLocationsByCountry);
router.get("/get-all-locations", getGlobalLocations);

export default router;
