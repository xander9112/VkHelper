import {alertConstants} from '../_constants'

export const alertActions = {
  clear,
  error,
  success,
}

function success(message: string) {
  return {type: alertConstants.SUCCESS, message}
}

function error(message: string) {
  return {type: alertConstants.ERROR, message}
}

function clear() {
  return {type: alertConstants.CLEAR}
}
