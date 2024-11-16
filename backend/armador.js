import express from "express"
import { validarQueryArmador } from "./middleware/validaciones.js";
import { body,query,validationResult} from "express-validator";
import {db} from "./database/connectionMySQL.js";

const armadorRouter = express.Router()

armadorRouter.get("/",validarQueryArmador(),async(req,res) => {
    const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errores: validacion.array() });
    return;
  }

//  const procesador = req.query.procesador;
//     if (procesador != undefined){

//     }
//     const motherboard = req.query.motherboard;
//     if (motherboard != undefined){

//     }


const [procesadores] = await db.execute(`SELECT pr.nombre,pr.stock,pr.peso,pr.garantia_meses,pr.codigo_fabricante,GROUP_CONCAT(c.nombre_categoria SEPARATOR ', ') AS categorias
,GROUP_CONCAT(DISTINCT i.url_imagen SEPARATOR ', ') AS url_imagenes,
p.precio_dolar, p.precio_dolar_iva, p.iva,p.precio_pesos, p.precio_pesos_iva,
d.alto,d.ancho,d.largo,pro.nombre_proveedor
FROM productos pr 
INNER JOIN precios p 
ON pr.id_producto = p.id_producto 
INNER JOIN productos_categorias pc 
ON pr.id_producto = pc.id_producto 
INNER JOIN categorias c ON pc.id_categoria = c.id_categoria
INNER JOIN productos_imagenes pi ON pi.id_producto = pr.id_producto
INNER JOIN imagenes i ON pi.id_imagen = i.id_imagen
INNER JOIN dimensiones d ON d.id_producto = pr.id_producto
INNER JOIN proveedores pro ON pro.id_proveedor = p.id_proveedor
WHERE 
    p.precio_dolar = (
        SELECT MIN(precio_dolar) 
        FROM precios 
        WHERE id_producto = pr.id_producto
        ) AND c.nombre_categoria = "procesadores"
        group by pr.id_producto, p.precio_dolar, p.precio_dolar_iva,p.iva,p.precio_pesos, p.precio_pesos_iva,d.alto,d.ancho,d.largo,pro.nombre_proveedor;`)


        const [motherboards] = await db.execute(`SELECT pr.nombre,pr.stock,pr.peso,pr.garantia_meses,pr.codigo_fabricante,GROUP_CONCAT(c.nombre_categoria SEPARATOR ', ') AS categorias
            ,GROUP_CONCAT(DISTINCT i.url_imagen SEPARATOR ', ') AS url_imagenes,
            p.precio_dolar, p.precio_dolar_iva, p.iva,p.precio_pesos, p.precio_pesos_iva,
            d.alto,d.ancho,d.largo,pro.nombre_proveedor
            FROM productos pr 
            INNER JOIN precios p 
            ON pr.id_producto = p.id_producto 
            INNER JOIN productos_categorias pc 
            ON pr.id_producto = pc.id_producto 
            INNER JOIN categorias c ON pc.id_categoria = c.id_categoria
            INNER JOIN productos_imagenes pi ON pi.id_producto = pr.id_producto
            INNER JOIN imagenes i ON pi.id_imagen = i.id_imagen
            INNER JOIN dimensiones d ON d.id_producto = pr.id_producto
            INNER JOIN proveedores pro ON pro.id_proveedor = p.id_proveedor
            WHERE 
                p.precio_dolar = (
                    SELECT MIN(precio_dolar) 
                    FROM precios 
                    WHERE id_producto = pr.id_producto
                    ) AND c.nombre_categoria = "motherboards"
                    group by pr.id_producto, p.precio_dolar, p.precio_dolar_iva,p.iva,p.precio_pesos, p.precio_pesos_iva,d.alto,d.ancho,d.largo,pro.nombre_proveedor;`)


const [memorias] = await db.execute(`SELECT pr.nombre,pr.stock,pr.peso,pr.garantia_meses,pr.codigo_fabricante,GROUP_CONCAT(c.nombre_categoria SEPARATOR ', ') AS categorias
,GROUP_CONCAT(DISTINCT i.url_imagen SEPARATOR ', ') AS url_imagenes,
p.precio_dolar, p.precio_dolar_iva, p.iva,p.precio_pesos, p.precio_pesos_iva,
d.alto,d.ancho,d.largo,pro.nombre_proveedor
FROM productos pr 
INNER JOIN precios p 
ON pr.id_producto = p.id_producto 
INNER JOIN productos_categorias pc 
ON pr.id_producto = pc.id_producto 
INNER JOIN categorias c ON pc.id_categoria = c.id_categoria
INNER JOIN productos_imagenes pi ON pi.id_producto = pr.id_producto
INNER JOIN imagenes i ON pi.id_imagen = i.id_imagen
INNER JOIN dimensiones d ON d.id_producto = pr.id_producto
INNER JOIN proveedores pro ON pro.id_proveedor = p.id_proveedor
WHERE 
    p.precio_dolar = (
        SELECT MIN(precio_dolar) 
        FROM precios 
        WHERE id_producto = pr.id_producto
        ) AND c.nombre_categoria = "memorias pc"
        group by pr.id_producto, p.precio_dolar, p.precio_dolar_iva,p.iva,p.precio_pesos, p.precio_pesos_iva,d.alto,d.ancho,d.largo,pro.nombre_proveedor;`)


        const [fuentes] = await db.execute(`SELECT pr.nombre,pr.stock,pr.peso,pr.garantia_meses,pr.codigo_fabricante,GROUP_CONCAT(c.nombre_categoria SEPARATOR ', ') AS categorias
            ,GROUP_CONCAT(DISTINCT i.url_imagen SEPARATOR ', ') AS url_imagenes,
            p.precio_dolar, p.precio_dolar_iva, p.iva,p.precio_pesos, p.precio_pesos_iva,
            d.alto,d.ancho,d.largo,pro.nombre_proveedor
            FROM productos pr 
            INNER JOIN precios p 
            ON pr.id_producto = p.id_producto 
            INNER JOIN productos_categorias pc 
            ON pr.id_producto = pc.id_producto 
            INNER JOIN categorias c ON pc.id_categoria = c.id_categoria
            INNER JOIN productos_imagenes pi ON pi.id_producto = pr.id_producto
            INNER JOIN imagenes i ON pi.id_imagen = i.id_imagen
            INNER JOIN dimensiones d ON d.id_producto = pr.id_producto
            INNER JOIN proveedores pro ON pro.id_proveedor = p.id_proveedor
            WHERE 
                p.precio_dolar = (
                    SELECT MIN(precio_dolar) 
                    FROM precios 
                    WHERE id_producto = pr.id_producto
                    ) AND c.nombre_categoria = "fuentes"
                    group by pr.id_producto, p.precio_dolar, p.precio_dolar_iva,p.iva,p.precio_pesos, p.precio_pesos_iva,d.alto,d.ancho,d.largo,pro.nombre_proveedor;`)

                    const [gabinetes] = await db.execute(`SELECT pr.nombre,pr.stock,pr.peso,pr.garantia_meses,pr.codigo_fabricante,GROUP_CONCAT(c.nombre_categoria SEPARATOR ', ') AS categorias
                        ,GROUP_CONCAT(DISTINCT i.url_imagen SEPARATOR ', ') AS url_imagenes,
                        p.precio_dolar, p.precio_dolar_iva, p.iva,p.precio_pesos, p.precio_pesos_iva,
                        d.alto,d.ancho,d.largo,pro.nombre_proveedor
                        FROM productos pr 
                        INNER JOIN precios p 
                        ON pr.id_producto = p.id_producto 
                        INNER JOIN productos_categorias pc 
                        ON pr.id_producto = pc.id_producto 
                        INNER JOIN categorias c ON pc.id_categoria = c.id_categoria
                        INNER JOIN productos_imagenes pi ON pi.id_producto = pr.id_producto
                        INNER JOIN imagenes i ON pi.id_imagen = i.id_imagen
                        INNER JOIN dimensiones d ON d.id_producto = pr.id_producto
                        INNER JOIN proveedores pro ON pro.id_proveedor = p.id_proveedor
                        WHERE 
                            p.precio_dolar = (
                                SELECT MIN(precio_dolar) 
                                FROM precios 
                                WHERE id_producto = pr.id_producto
                                ) AND c.nombre_categoria = "gabinetes"
                                group by pr.id_producto, p.precio_dolar, p.precio_dolar_iva,p.iva,p.precio_pesos, p.precio_pesos_iva,d.alto,d.ancho,d.largo,pro.nombre_proveedor;`)
                                const [almacenamiento] = await db.execute(`
                                    SELECT pr.nombre, pr.stock, pr.peso, pr.garantia_meses, pr.codigo_fabricante,
                                           GROUP_CONCAT(c.nombre_categoria SEPARATOR ', ') AS categorias,
                                           GROUP_CONCAT(DISTINCT i.url_imagen SEPARATOR ', ') AS url_imagenes,
                                           p.precio_dolar, p.precio_dolar_iva, p.iva, p.precio_pesos, p.precio_pesos_iva,
                                           d.alto, d.ancho, d.largo, pro.nombre_proveedor
                                    FROM productos pr
                                    INNER JOIN precios p ON pr.id_producto = p.id_producto
                                    INNER JOIN productos_categorias pc ON pr.id_producto = pc.id_producto
                                    INNER JOIN categorias c ON pc.id_categoria = c.id_categoria
                                    INNER JOIN productos_imagenes pi ON pi.id_producto = pr.id_producto
                                    INNER JOIN imagenes i ON pi.id_imagen = i.id_imagen
                                    INNER JOIN dimensiones d ON d.id_producto = pr.id_producto
                                    INNER JOIN proveedores pro ON pro.id_proveedor = p.id_proveedor
                                    WHERE 
                                        p.precio_dolar = (
                                            SELECT MIN(precio_dolar)
                                            FROM precios
                                            WHERE id_producto = pr.id_producto
                                        )
                                        AND c.nombre_categoria IN ("discos internos", "discos internos ssd")
                                    GROUP BY pr.id_producto, p.precio_dolar, p.precio_dolar_iva, p.iva, p.precio_pesos, p.precio_pesos_iva, d.alto, d.ancho, d.largo, pro.nombre_proveedor;
                                `);
                                
    
res.status(200).send({procesadores: procesadores,motherboards:motherboards,memorias:memorias,fuentes:fuentes,gabinetes:gabinetes,almacenamiento:almacenamiento})
})

export default armadorRouter;