let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8074'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-web-1nki.vercel.app/'
}

export const API_ROOT = apiRoot
// export const API_ROOT = 'http://localhost:8074'


export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

export const CARD_MEMBER_ACTION = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}