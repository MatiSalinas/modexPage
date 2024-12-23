import React, { useEffect, useState } from "react";

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
import { Alert, AlertTitle, Box, Snackbar, TextField } from "@mui/material";
import { useAuth } from "../Auth";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

export default function ProductCard() {
    const url = 'localhost'
    const [productos, setProductos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const itemPorPagina = 32;
    const [totales, setTotales] = useState(0);
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precioMax, setPrecioMax] = useState("");
    const [precioMin, setPrecioMin] = useState("");
    const [favoritos, setFavoritos] = useState([])
    const { sesion } = useAuth();
    const [alerta, setAlerta] = useState(false)
    const [alertaFav, setAlertaFav] = useState(false)
    const [carrito, setCarrito] = useState([]);
    const [favorito, setFavorito] = useState([]);



    const construirQuery = () => {
        let query = `offset=${(pagina - 1) * itemPorPagina}&limit=${itemPorPagina}`;
        if (precioMin) query += `&precio_gt=${precioMin}`;
        if (precioMax) query += `&precio_lt=${precioMax}`;
        if (categoria) query += `&categoria=${categoria}`;
        if (nombre) query += `&nombre=${nombre}`;
        return query;
    };

    const agregarCarrito = async (producto_id) => {
        if (carrito.includes(producto_id)) {
            console.log("El producto ya está en el carrito");
            return;
        }

        try {
            const response = await fetch(
                `http://${url}:3000/carrito`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sesion.token}`,
                    },
                    body: JSON.stringify({ "id_producto": producto_id })
                }
            );
            if (response.ok) {
                const mensaje = await response.json()
                console.log(mensaje)
                setCarrito([...carrito, producto_id])
            } else {
                console.log(response)
                console.log(producto_id)
            }
        } catch (error) {
            console.log("aaaa")
            console.log(error)
        }
    };

  const agregarFavorito = async (producto_id) => {
    if (favorito.includes(producto_id)) {
        console.log("El producto ya está en favorito");
        return;
    }
    
        try {
            const response = await fetch(
                `http://${url}:3000/favorito`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sesion.token}`,
                    },
                    body: JSON.stringify({ "id_producto": producto_id })
                }
            );
            if (response.ok) {
                const mensaje = await response.json()
                console.log(mensaje)
                setFavorito([...favorito, producto_id])
            } else {
                console.log(response)
                console.log(producto_id)
            }
        } catch (error) {
            console.log("aaaa")
            console.log(error)
        }
    };

    const estaEnFavoritos = (producto_id) => favorito.includes(producto_id);

    const getProductos = async () => {
        try {
            const query = construirQuery();
            const response = await fetch(
                `http://${url}:3000/productos?${query}`,
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
                setTotales(data.cantidadProductos);
                if (data.productos && Array.isArray(data.productos)) {
                    setProductos(data.productos);
                } else {
                    console.error("Estructura de datos incorrecta:", data);
                }
            } else {
                localStorage.removeItem('sesion')
                console.log("aaa")
                console.error("Error al obtener productos:", response.status);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    useEffect(() => {
        getProductos();
    }, [pagina]);
    return (
        <Container sx={{}}>
            <Card sx={{ bgcolor: "#FFfff", padding: 5, marginX: -10, marginY: 5 }}>
                <Grid>

                    <Typography level="h3">Filtrar por: </Typography>
                    <br />
                    <TextField label="Buscar por Nombre" name="nombre" variant="outlined" size="small" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ marginRight: "10px" }} />
                    <TextField label="Buscar por Categoria" name="categoria" variant="outlined" size="small" value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ marginRight: "10px" }} />
                    <TextField label="Minimo Precio" name="precioMin" variant="outlined" size="small" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)} style={{ marginRight: "10px" }} />
                    <TextField label="Maximo Precio" name="precioMax" variant="outlined" size="small" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} style={{ marginRight: "10px" }} />
                    <Button variant="contained" sx={{ backgroundColor: "#a111ad" }} onClick={() => { setPagina(1); getProductos(); }}>
                        Aplicar Filtros
                    </Button>
                </Grid>
                <Grid container spacing={5} style={{ marginTop: "20px" }}>
                    {productos.length > 0 ? (
                        productos.map((producto, index) => (
                            <Grid xs={12} sm={6} md={4} lg={3} key={producto.id_producto}>
                                <Card sx={{ width: 280, bgcolor: "#e0e0e0", height: 350 }}>
                                    <AspectRatio minHeight="120px" maxHeight="200px">
                                        <img
                                            src={producto.url_imagenes}
                                            alt={producto.nombre}
                                            loading="lazy"
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </AspectRatio>
                                    <CardContent orientation="horizontal" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <div>
                                            <Typography level="h4" sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, textOverflow: "ellipsis", fontWeight: "bold", }}>{producto.nombre}</Typography>
                                            <Typography>{producto.descripcion}</Typography>
                                            <Typography level="h3" sx={{ fontWeight: "xl", mt: 0.8 }}>${parseFloat(producto.precio_pesos_iva_ajustado).toFixed(2)}</Typography>
                                            <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                                                <Button variant="contained" size="large" onClick={() => {agregarCarrito(producto.id_producto); setAlerta(true)}} startIcon={<AddShoppingCartIcon />} sx={{ ml: 2, my: 2, backgroundColor: "#a111ad", height: 45, borderRadius: "20px", fontSize: "0.75rem", objectFit: "contain", }}>Añadir al Carro</Button>
                                                <IconButton variant="contained" size="large" sx={{
                                                    ml: 2, height: 45, width: 45, backgroundColor: "#a111ad", borderRadius: "50px", objectFit: "contain", color: "white",
                                                    "&:active": {
                                                        transform: "scale(0.95)",
                                                        transition: "transform 0.2s ease",
                                                    },
                                                    "&:hover": {
                                                        backgroundColor: "#9e2590",
                                                    },
                                                }}
                                                    onClick={() => {agregarFavorito(producto.id_producto); setAlertaFav(true)}}
                                                >
                                                    {estaEnFavoritos(producto.id_producto) ? (
                                                        <FavoriteIcon sx={{ color: "orange" }} />
                                                    ) : (
                                                        <FavoriteIcon />
                                                    )}
                                                </IconButton>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>Despues pongo un mensaje de error o skeleton</Typography>
                    )}
                </Grid>
                <Snackbar
                        open={alerta}
                        autoHideDuration={2000}
                        onClose={() => setAlerta(false)}
                        variant="solid"
                    >
                    <Alert size="large" severity="success" icon={<AddShoppingCartIcon sx={{fontSize: "2rem", color:"white"}}/>}
                    sx={{
                        backgroundColor: "#a111ad", color: "white", fontSize: "1rem", padding: "12px", display: "flex", alignItems: "center", borderRadius: 3
                    }}>
                        El producto fué Añadido al Carrito
                    </Alert>
                </Snackbar>
                <Snackbar
                        open={alertaFav}
                        autoHideDuration={2000}
                        onClose={() => setAlertaFav(false)}
                        variant="solid"
                    >
                    <Alert size="large" severity="success" icon={<FavoriteIcon sx={{fontSize: "2rem", color:"white"}}/>} 
                    sx={{
                        backgroundColor: "#a111ad", color: "white", fontSize: "1rem", padding: "12px", display: "flex", alignItems: "center", borderRadius: 3
                    }}>
                        El producto fué Añadido a Favorito
                    </Alert>
                </Snackbar>
                <Pagination count={Math.ceil(totales / itemPorPagina)} pagina={pagina} onChange={(e, value) => setPagina(value)} color="primary" sx={{
                    mt: 3, display: "flex", justifyContent: "center",
                    "& .MuiPaginationItem-root": {
                        color: "#a111ad",
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#a111ad",
                        color: "white",
                    },
                    "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "#d17dcf",
                    }
                }} />
            </Card>
        </Container>
    );
}