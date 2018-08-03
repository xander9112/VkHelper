export interface IAlbum {
  id: number
  thumb_id: number
  owner_id: number
  title: string
  description: string
  created: number
  updated: number
  size: number
  thumb_is_last: number
  can_upload: number
  upload_by_admins_only: number
  comments_disabled: number

  [key: string]: any
}
