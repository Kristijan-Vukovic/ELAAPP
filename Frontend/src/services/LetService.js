import { httpService, obradiGresku, obradiUspjeh } from "./httpService";

const naziv = 'Let';

async function get(){
  return await httpService.get('/' + naziv).then(obradiUspjeh).catch(obradiGresku);
}

async function obrisi(sifra) {
  return await httpService.delete('/' + naziv + '/' + sifra).then(obradiUspjeh).catch(obradiGresku);
}

async function dodaj(entitet) {
  return await httpService.post('/' + naziv, entitet).then(obradiUspjeh).catch(obradiGresku);
}

async function getBySifra(sifra) {
  return await httpService.get('/'+naziv+'/' + sifra).then(obradiUspjeh).catch(obradiGresku);
}

async function promjeni(sifra, entitet) {
  return await httpService.put('/'+naziv+'/' + sifra, entitet).then(obradiUspjeh).catch(obradiGresku);
}

export default{
  get,
  obrisi,
  dodaj,
  getBySifra,
  promjeni
};