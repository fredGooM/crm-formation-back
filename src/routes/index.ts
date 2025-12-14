import { Router } from "express";
import apprenantsRoutes from "./apprenants.routes";
import formationsRoutes from "./formations.routes";
import commandesRoutes from "./commandes.routes";

const router = Router();

router.use("/apprenants", apprenantsRoutes);
router.use("/formations", formationsRoutes);
router.use("/commandes", commandesRoutes);

export default router;
