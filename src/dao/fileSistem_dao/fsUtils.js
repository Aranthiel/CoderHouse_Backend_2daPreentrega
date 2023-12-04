import fs from 'fs/promises';

export async function writeDataToFile(path, data) {
  try {
    // Escribir en el archivo
    await fs.writeFile(path, JSON.stringify(data, null, 2));
    console.log(`Datos escritos en ${path} correctamente.`);
  } catch (error) {
    throw new Error(`Error al escribir en el archivo ${path}: ${error.message}`);
  }
}
