import { useState, useEffect } from 'react'
import '../styleArmador.css'
import icono_cpu from "/iconos/armadorIconos/cpu.png"
import icono_gpu from "/iconos/armadorIconos/gpu.png"
import icono_psu from "/iconos/armadorIconos/psu.png"
import icono_ram from "/iconos/armadorIconos/ram.png"
import icono_hdd from "/iconos/armadorIconos/hdd.png"
import icono_mother from "/iconos/armadorIconos/motherboard.png"
import icono_gabinete from "/iconos/armadorIconos/gabinete.png"
import { useAuth } from '../Auth'


import Card from "@mui/joy/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/joy/Grid";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/material/Button";
import IconButton from "@mui/joy/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";
import Delete from '@mui/icons-material/Delete'


function ArmadorPc() {
const url = 'localhost'
const { sesion } = useAuth();
const [productos,setProductos] =useState({
    productos:{
        "procesadores":[],
        "mothers":[],
        "placas":[],
        "almacenamiento":[],
        "memorias":[],
        "coolers":[],
        "fuentes":[],
        "gabinetes":[]
    }});

// Crear un índice
const crearIndice = (productos) => {
    const indice = {};
    for (const categoria in productos) {
      productos[categoria].forEach((producto) => {
        indice[producto.id_producto] = { ...producto, categoria };
      });
    }
    return indice;
  };

  // Crear el índice una vez
  const indiceProductos = crearIndice(productos.productos);

  // Búsqueda rápida
  const buscarPorId = (id) => indiceProductos[id] || null;

const [tipo,setTipo] = useState("procesadores")
const [elecciones, setElecciones] = useState({procesador:"",mother:"",placa:"",memorias:[],almacenamiento:[],coolers:[],fuente:"",gabinete:""});
const [total,setTotal] = useState(0)
const getArmador = async () => {
    let query = `?`;
        if (elecciones.procesador !="") {
            query += `&procesador_id=${elecciones.procesador}`;
        }
        if (elecciones.mother !="") {
            query += `&motherboard_id=${elecciones.mother}`;
        }
        if (elecciones.memorias.length>0) {
            query += `&memoria_id=${elecciones.memorias[0]}`;
        }

    try {
        const response = await fetch(
            `http://${url}:3000/armador${query}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sesion.token}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setProductos(data)
        } else {
            console.error("Error al obtener productos:", response.status);
        }
    } catch (error) {
    }
};
let totalaux = 0;
useEffect(() => {
    getArmador();
    setTotal(Number(totalaux))
}, [elecciones]);
const eliminarID = (id) => {
  setElecciones((prevElecciones) => {
    const nuevasElecciones = { ...prevElecciones };

    Object.keys(nuevasElecciones).forEach((key) => {
      if (Array.isArray(nuevasElecciones[key])) {
        // Si es un array, eliminamos el ID si está presente
        nuevasElecciones[key] = nuevasElecciones[key].filter((item) => item !== id);
      } else if (nuevasElecciones[key] === id) {
        // Si no es un array y coincide, lo eliminamos
        nuevasElecciones[key] = "";
      }
    });

    return nuevasElecciones;
  });
};
const handleSeleccionar = (id_producto,precio) =>{

    switch (tipo) {
        case 'procesadores':
            setElecciones({...elecciones,procesador:id_producto})
            setTipo('motherboards')
            break;
        case 'motherboards':
            setElecciones({...elecciones,mother:id_producto})
            setTipo('gpus')
            break;
        case 'gpus':
            setElecciones({...elecciones,placa:id_producto})
            setTipo('memorias')
            break;
        case 'memorias':
            console.log(elecciones.memorias.length)
            if(elecciones.memorias.length < 4){
                setElecciones({...elecciones,memorias:[...elecciones.memorias,id_producto]})
                if(elecciones.memorias.length == 4){
                    setTipo('almacenamiento')
                }
            }else{
                setTipo('almacenamiento')
            }

            break;
        case 'almacenamiento':
            setElecciones({...elecciones,almacenamiento:[...elecciones.almacenamiento,id_producto]})
            break;
        case 'fuentes':
            setElecciones({...elecciones,fuente:id_producto})
            setTipo('gabinetes')
            break;
        case 'gabinetes':
            setElecciones({...elecciones,gabinete:id_producto})
            break;

        default:
            break;
    }


}
return(

    <div className="containerArmador">
        <div className="armador">
            <div className="ladoIzquierdoArmador">
                <div className="tipo">
                    <div className="procesador" onClick={()=>setTipo("procesadores")}><img src={icono_cpu}  /></div>
                    <div className="motherboard" onClick={()=>setTipo("motherboards")}><img src={icono_mother}  /></div>
                    <div className="gpu" onClick={()=>setTipo("gpus")}><img src={icono_gpu}  /></div>
                    <div className="memoria" onClick={()=>setTipo("memorias")}><img src={icono_ram}  /></div>
                    <div className="almacenamiento" onClick={()=>setTipo("almacenamiento")}><img src={icono_hdd}  /></div>
                    <div className="psu" onClick={()=>setTipo("fuentes")}><img src={icono_psu}  /></div>
                    <div className="gabinete" onClick={()=>setTipo("gabinetes")}><img src={icono_gabinete}  /></div>
                </div>
                <div className="elecciones">

                    {
                    Object.entries(elecciones).map(([categoria,valor])=>{
                        if(valor == 0){
                            return null
                        }
                        if(typeof(valor) == "object"){
                            return valor.map((productoArreglo,index) =>{
                                const producArreglo = buscarPorId(productoArreglo)
                                totalaux = Number(totalaux) + Number(producArreglo.precio_pesos_iva_ajustado)
                                return (
                                    <div className="productoCarritoArmador" key={`${productoArreglo}+${index}`}> 
                                        {producArreglo.nombre} :<br></br> $ {parseFloat(producArreglo.precio_pesos_iva_ajustado).toFixed(2)} <br />
                                        {/* <button type="button" onClick={()=>eliminarID(producArreglo.id_producto)}>X</button>  */}
                                        <IconButton variant='contained' onClick={()=>eliminarID(producArreglo.id_producto)} sx={{height: 20, width: 20, backgroundColor: "#a111ad", borderRadius: "10px", objectFit: "contain", color: "white",
                                                "&:active": {
                                                    transform: "scale(0.95)",
                                                    transition: "transform 0.2s ease",
                                                },
                                                "&:hover": {
                                                    backgroundColor: "#e0e0e0",
                                                    color: "black"
                                                },
                                            }}><Delete></Delete></IconButton>
                                    </div>
                                )
                            })
                        }else {


                            const produc = buscarPorId(valor)
                            totalaux = Number(totalaux) + Number(produc.precio_pesos_iva_ajustado)
                            return (
                                <div className="productoCarritoArmador" key={categoria}>
                                {produc.nombre}: <br></br>$ {parseFloat(produc.precio_pesos_iva_ajustado).toFixed(2)}
                                
                                {/* <button type="button" onClick={()=>eliminarID(produc.id_producto)}><Delete></Delete></button> */}
                                    
                                <div>
                                <IconButton  onClick={()=>eliminarID(produc.id_producto)} sx={{height: 20, width: 20, backgroundColor: "#a111ad", borderRadius: "10px", objectFit: "contain", color: "white",
                                                "&:active": {
                                                    transform: "scale(0.95)",
                                                    transition: "transform 0.2s ease",
                                                },
                                                "&:hover": {
                                                    backgroundColor: "#e0e0e0",
                                                    color: "black"
                                                },
                                            }}><Delete></Delete></IconButton>
                                            </div>
                                </div>
                            )

                        }
                    })}
                    <p className='total'>Total: <span style={{marginLeft: "10px", color:"green"}}> ${total.toFixed(2)}</span></p>
                </div>
            </div>
            <div className="productos">
                <Grid container spacing={2} style={{ marginTop: "10px", justifyContent: "center"}}>
            {
                            productos.productos[`${tipo}`].map((producto, index) => (
                                <Grid item lg={3.9} key={producto.id_producto}>
                                    <Card orientation='horizontal' sx={{ width: "95%", bgcolor: "#e0e0e0", height: 180 }} >
                                        <AspectRatio  ratio="1"  sx={{ width: 130 }}>
                                            <img
                                                src={producto.url_imagenes}
                                                alt={producto.nombre}
                                                loading="lazy"
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                        </AspectRatio>
                                        <CardContent orientation="horizontal" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <div>
                                                <Typography level="h5" sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, textOverflow: "ellipsis", fontWeight: "bold",}}>{producto.nombre}</Typography>
                                                <Typography>{producto.descripcion}</Typography>
                                                <Typography level="h4" sx={{ fontWeight: "xl", mt: 0.8 }}>${parseFloat(producto.precio_pesos_iva_ajustado).toFixed(2)}</Typography>
                                                <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                                                    <Button variant="contained" onClick={()=>handleSeleccionar(producto.id_producto,parseFloat(producto.precio_pesos_iva_ajustado).toFixed(2))} size="" sx={{ ml: 2, my:1.5, backgroundColor: "#a111ad", height: 40, borderRadius: "20px", fontSize: "0.75rem", objectFit: "contain", }}>Seleccionar</Button>

                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    </Grid>
                            ))
                        }
                        </Grid>
            </div>
        </div>
    </div>
)
}

export default ArmadorPc;