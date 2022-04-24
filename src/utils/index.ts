const lineClamp = (texto: string) => {
  if (texto.length > 145) {
    return texto.slice(0, 145) + '&hellip;'
  }
  
  return texto
}

export { lineClamp }