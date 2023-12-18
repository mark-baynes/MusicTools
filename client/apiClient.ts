import request from 'superagent'

import { Url, NewUrl } from '../models/Urls'

const baseUrl = '/api/v1/urls/'

export async function getUrls(): Promise<Url[]> {
  
  const response = await request.get(baseUrl)
  return response.body
}

export async function addUrl(url: NewUrl): Promise<void> {
  await request.post(baseUrl).send(url)
}

export async function deleteUrl(id: number): Promise<void> {
  await request.delete(`${baseUrl}${id}`)
}

export async function editUrl(id: number, url: NewUrl): Promise<void> {
  await request.patch(`${baseUrl}${id}`).send(url)
}
