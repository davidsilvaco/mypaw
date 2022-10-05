import express from "express";
import { body } from "express-validator";
import {admin,crear, guardar} from '../controllers/serviciosController.js'
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router()


router.get('/mis-servicios',protegerRuta, admin )
router.get('/servicios/crear',protegerRuta, crear)
router.post('/servicios/crear', protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo del Servicio es obligatorio'),
    body('descripcion')
        .notEmpty()
        .withMessage('La descripción no puede ir vacía')
        .isLength({ max:200}).withMessage('La Descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecione una categoria'),
    body('precio').isNumeric().withMessage('Seleccione un rango de precio'),
    body('lat').notEmpty().withMessage('Ubica la propiedad donde darás el servicio'),
    guardar
 )


export default router