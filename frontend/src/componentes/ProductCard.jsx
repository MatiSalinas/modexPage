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
import { TextField } from "@mui/material";

export default function ProductCard() {
    const [productos, setProductos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const itemPorPagina = 30;
    const [totales, setTotales] = useState(0)
    const [nombre, setNombre] = useState("")
    const [categoria, setCategoria] = useState("")
    const [precioMax, setPrecioMax] = useState()
    const [precioMin, setPrecioMin] = useState()
    const [query, setQuery] = useState("30")
    
    
    const getProductos = async () => {
        try {
            const offset = (pagina - 1) * itemPorPagina;
            const response = await fetch(
                `http://localhost:3000/productos?offset=${offset}&limit=${query}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNodWtlciIsInJvbCI6MSwidXNlcklkIjoxMiwiaWF0IjoxNzMyNDg2ODc1LCJleHAiOjE3MzI0OTQwNzV9.JRMnAoOOf3Xg_ZjKu_GFaQj7Uftdc75MXPrKHFCUakI",
                    },
                }
                );

            if (response.ok) {
                const data = await response.json();
                setTotales(data.cantidadProductos)
                if (data.productos && Array.isArray(data.productos)) {
                    setProductos(data.productos);
                } else {
                    console.error("Estructura de datos incorrecta:", data);
                }
            } else {
                console.error("Error al obtener productos:", response.status);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    
    const ponerFiltros=()=>{

    }

    useEffect(() => {
        
        getProductos();
    }, [pagina]);

    return (
        <Container>
            <TextField label="Buscar por Nombre" name="nombre" variant="outlined" size="small" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ marginRight: "10px" }} />
            {/* <TextField label="Buscar por Categoria" name="categoria" variant="outlined" size="small" value={categoria} onChange={(e) => setCategoria(e.target.value)}  style={{ marginRight: "10px" }} /> */}
            <TextField label="Minimo Precio" name="precioMin" variant="outlined" size="small" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)}  style={{ marginRight: "10px" }} />
            <TextField label="Maximo Precio" name="precioMax" variant="outlined" size="small" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)}  style={{ marginRight: "10px" }} />
            <Button variant="contained" sx={{backgroundColor: "#a111ad"}} onClick={(ponerFiltros) => setPagina(1)}>
                    Aplicar Filtros
                </Button>
            <Grid container spacing={5} style={{ marginTop: "20px" }}>
                {productos.length > 0 ? (
                    productos.map((producto, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{ width: 300, bgcolor: "#e0e0e0", height: 400 }}>
                                <AspectRatio minHeight="120px" maxHeight="200px">
                                    <img
                                        src={producto.url_imagenes}
                                        alt={producto.nombre}
                                        loading="lazy"
                                    />
                                </AspectRatio>
                                <CardContent orientation="horizontal" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div>
                                        <Typography level="h4" sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, textOverflow: "ellipsis", fontWeight: "bold",}}>{producto.nombre}</Typography>
                                        <Typography>{producto.descripcion}</Typography>
                                        <Typography level="h3" sx={{ fontWeight: "xl", mt: 0.8 }}>${producto.precio_pesos_iva}</Typography>
                                        <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                                            <Button variant="contained" size="large" startIcon={<AddShoppingCartIcon />} sx={{ ml: 2, my: 2, backgroundColor: "#a111ad", height: 45, borderRadius: "20px", fontSize: "0.75rem", objectFit: "contain", }}>Añadir al Carro</Button>
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
                                            >
                                                <FavoriteIcon />
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
                    backgroundColor: "#d17dcf",}
            }}/>
        </Container>
    );
}
