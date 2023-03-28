import { useState, useEffect } from "react";

export function useCostoTotal(regalos){
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const valor = regalos.map(item => (item.precio * item.cantidad))
    const inicial = 0
    const suma = valor.reduce((acumulado, valoractual) => acumulado + valoractual, inicial);
    setTotal(suma);
}, [regalos]);

  return { total };
}