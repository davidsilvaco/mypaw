import { validationResult } from 'express-validator'
import { Precio, Categoria, Servicios } from '../models/index.js'


const  admin= (req,res) => {
    res.render('servicios/admin', {
        pagina: 'Mis Servicios',
        barra: true
    })
}

// Formulario para crear una nuevo servicio
const crear = async (req, res) => {
    // Modelo de precio y categoria
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ]);

    res.render('servicios/crear',{

        pagina: 'Crear Servicio',
        barra: true,
        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios:  precios,
        datos: {}

    })

}

const guardar = async (req, res) => {
     
    //Validacion
    let resultado  = validationResult(req) 

    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])


    if(!resultado.isEmpty()){

        return res.render('servicios/crear', {
            pagina: 'Crear Servicio',
            barra: true,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }

    // Crear un registro
    const {titulo, descripcion, calle,lat,lng, precio:precioId, categoria: categoriaId}  = req.body

    const {id: usuarioId} = req.usuario

    // console.log(req.usuario.id);

   try {
        // Creamos variables
        const serviciGuadado = await Servicios.create({
            titulo: titulo,
            descripcion: descripcion,
            calle: calle,
            lat: lat,
            lng: lng,
            precioId,
            categoriaId,
            usuarioId,
            imagen:''

        })

        const {id} = serviciGuadado

        res.redirect(`/servicios/agregar-imagen/${id}`)
    
   } catch (error) {

     console.log(error);
    
   }
     
}


export {

    admin,
    crear,
    guardar
}