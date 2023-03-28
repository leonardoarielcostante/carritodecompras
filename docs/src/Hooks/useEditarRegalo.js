import { useState, useEffect } from "react";

export function useEditarRegalo(regalo) {
  const [input, setInput] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [foto, setFoto] = useState('');
  const [persona, setPersona] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
     setInput(regalo.texto || '');
     setPrecio(regalo.precio || '');
     setPersona(regalo.persona || '');
     setCantidad(regalo.cantidad || '');
     setFoto(regalo.foto || '');
  }, [regalo]);

  return { input, setInput, cantidad, setCantidad, foto, setFoto, persona, setPersona, precio, setPrecio };
}