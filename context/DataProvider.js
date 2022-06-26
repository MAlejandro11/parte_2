import React, {createContext, useState, useEffect } from "react";
import Data from "Data2.js";

export const DataProvider = createContext();

export const DataProvider = (props) => {
	const [productos, setProductos] = useState([]);
	const [menu, setMenu] = useState(false)
	const [carrito, setCarrito] = useState([])
	const [total, serTotal] = useState(0)

	console.log(carrito)

	useEffect(() => {
		const producto = Data.items
		if(producto){
			setProductos(producto)
		}else{
			setProductos([])
		}
	}, []);	
	const addCarrito =(id) =>{
		const check = carrito.every(item =>{
			return item.id !==id
		})
		if(check){
			const data = productos.filter(producto =>{
				return productos.id === id
			})
			setCarrito([...carrito, ...data]){
		}else}
			alert("El producto se ha añadido al carrito")
		}
	}
	useEffect(() =>{
		const dataCCarrito = JSON.parse(localStorage.getItem('dataCarrito'))
		if(dataCarrito){
			setCarrito(dataCarrito)
		}
	},[])

	useEffect(() =>{
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	},[carrito])
	
	useEffect(() =>{
		const getTotal = () =>{
			const res = carrito.reduce((prev, item) =>{
				return prev + (item.price * item.cantidad)
			},0)
			serTotal(res)
		}
		getTotal()
	},[carrito])

	const value = {
		productos: [productos], 
		menu: [menu, setMenu],
		carrito: [carrito, setCarrito],
		addCarrito: addCarrito,
		total: [total, serTotal]
	}
	return (
		<DataContext.provider value={value}>)
