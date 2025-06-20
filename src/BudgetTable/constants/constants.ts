export const months = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio", 
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
] as const;

export const cogOptions = [
  {
    cogKey: 21101,
    description: "Materiales, útiles y equipos menores de oficina",
  },
  { cogKey: 21501, description: "Material impreso e información digital" },
  { cogKey: 22101, description: "Productos alimenticios para personas" },
  {
    cogKey: 29301,
    description:
      "Refacciones y accesorios menores de mobiliario y equipo de administración, educacional y recreativo",
  },
  {
    cogKey: 29401,
    description:
      "Refacciones y accesorios menores de equipo de cómputo y tecnologías de la información",
  },
  {
    cogKey: 31701,
    description:
      "Servicios de acceso de Internet, redes y procesamiento de información",
  },
  { cogKey: 31801, description: "Servicios postales y telegráficos" },
  {
    cogKey: 33301,
    description:
      "Servicios de consultoría administrativa, procesos, técnica y en tecnologías de la información",
  },
  {
    cogKey: 33601,
    description: "Servicios de apoyo administrativo, fotocopiado e impresión",
  },
  { cogKey: 37201, description: "Pasajes terrestres" },
  { cogKey: 37501, description: "Viáticos en el país" },
  { cogKey: 38201, description: "Gastos de orden social y cultural" },
  { cogKey: 39901, description: "Otros servicios generales" },
  { cogKey: 44301, description: "Apoyos educacionales" },
  { cogKey: 51101, description: "Muebles de oficina y estantería" },
  {
    cogKey: 51501,
    description: "Equipo de cómputo y de tecnología de la información",
  },
  {
    cogKey: 51901,
    description: "Otros mobiliarios y equipos de administración",
  },
] as const;

export const defaultRow = {
  comp: "C0201",
  ur: "201101",
  urDescription: "Secretaría de Asuntos Legislativos y Jurídicos",
  cogDescription: "",
  enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0,
  julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0
} as const;