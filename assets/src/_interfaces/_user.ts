export interface IUser {
  email: string,
  user: number,
  token: string,
  expires: number,
  first_name: string,
  last_name: string,
  screen_name: string,
  sex: number,
  relation: number,
  relation_partner: object,
  relation_requests: object[],
  bdate: string,
  bdate_visibility: number,
  home_town: string,
  country: {
    id: number,
    title: string
  },
  status: string,
  phone: string
}
