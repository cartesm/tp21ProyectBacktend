import { Router } from "express";
import {
    addLocation,
    getAllLocationsByCountry,
    getGlobalLocations,
} from "../controllers/locations.controllers";
import Auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.post("/add-location", Auth, addLocation);

router.post("/try",Auth,(req,resp)=>{

    console.log(req.cookies.token)

    resp.send("hola")

})

router.get("/get-by-country", getAllLocationsByCountry);
router.get("/get-all-locations", getGlobalLocations);

export default router;
