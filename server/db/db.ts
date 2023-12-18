import connection from './connection.ts' 
import { Url, NewUrl } from '../../models/Urls.ts' 


export function getUrls(db = connection): Promise<Url[]> {
  return db<Url>('musicLinks').select() 
}


export function newUrl(newUrlData: NewUrl): Promise<Url> {
  return connection<Url>('musicLinks') 
    .insert({ ...newUrlData }) 
    .returning(['id', 'name', 'url']) 
}


export function deleteUrl(id: number): Promise<number> {
  return connection('musicLinks').where({ id }).del() 
}


export function updateUrl(id: number, updatedData: NewUrl) {
  return connection('musicLinks') 
    .where({ id }) 
    .update({ ...updatedData }) 
    .returning([
      'id',
      'name',
      'url',
    ])
}
