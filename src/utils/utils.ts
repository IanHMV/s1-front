import { Catalogo } from '@models/declaracion/common.model';

export const findInArray = (list: string[], option: string): string | null => {
  const element = list.find((item) => item === option);

  return element || null;
};

export const findOption = (list: Catalogo[], clave: string): Catalogo | null => {
  const element = list.find((item) => item?.clave === clave);

  return element || null;
};

export const ifExistsEnableFields = (value: any, form: any, formRoute: string): void => {
  if (value) {
    form.get(formRoute).enable();
  } else {
    form.get(formRoute).disable();
  }
};

export const limpiarTexto = (texto: string): string => texto.replace(/\s+/g, ' ').trim();

const esObjetoPlano = (valor: any): boolean => {
  if (typeof valor !== 'object' || valor === null) {
    return false;
  }

  const prototipo = Object.getPrototypeOf(valor);

  return prototipo === Object.prototype || prototipo === null;
};

export const limpiarEspacios = (valor: any, excepciones: string[] = []): any => {
  if (typeof valor === 'string') {
    return limpiarTexto(valor);
  }

  if (Array.isArray(valor)) {
    return valor.map((elemento) => limpiarEspacios(elemento, excepciones));
  }

  if (esObjetoPlano(valor)) {
    return Object.keys(valor).reduce((limpio: any, clave: string) => {
      limpio[clave] = excepciones.includes(clave) ? valor[clave] : limpiarEspacios(valor[clave], excepciones);

      return limpio;
    }, {});
  }

  return valor;
};

export const limpiarClave = (clave: string): string => (clave || '').replace(/[\s-]/g, '').toUpperCase();

export const separarRfc = (rfc: string): { rfc: string; homoClave: string } => {
  const limpio = limpiarClave(rfc);

  return { rfc: limpio.slice(0, 10), homoClave: limpio.slice(10, 13) };
};
