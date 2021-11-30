import * as api from './api.js'

export const login = api.login
export const register = api.register
export const logout = api.logout

const endpoints = {
  all: '/data/catalog',
  byId: '/data/catalog',
  myItems: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`

}

export async function getAll(){
  return api.get(endpoints.all)
}

export async function getById(id){
  return api.get(endpoints.ById + id)
}

export async function getMyItems(userId){
  return api.get(endpoints.myItems(userId))
}


