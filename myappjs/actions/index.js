import { normalize } from 'normalizr';
import ActionTypes from '../const/ActionTypes';
import * as schemes from '../schemes/index';

export function login(mid) {
  console.log(111, mid);
  return {
    Server_Api: {
      type: ActionTypes.Login,
      endpoint: '/login',
      params: {
        mid
      }
    }
  };
}

export function fetchmymusic(token,limit,offset) {
  return {
    Server_Api: {
      type: ActionTypes.Fetchmymusic,
      // endpoint: '/music/my_list',
      endpoint: '/music/list',
      params: {
        token,limit,offset
      },
      normailzerFun: response => normalize(response.data, schemes.List)
    }
  };
}
export function fetchrecommendmusic(token,tpl_id) {
  return {
    Server_Api: {
      type: ActionTypes.Fetchrecommendmusic,
      // endpoint: '/music/recommend_list',
      endpoint: '/album/get_musics_by_tpl_id',
      params: {
        token,tpl_id
      },
      normailzerFun: response => normalize(response.data, schemes.List)
    }
  };
}
export function selectid(id) {
  return {
    type: ActionTypes.Selectid,
    id
  };
}
export function selectmoreid(id) {
  return {
    type: ActionTypes.Selectmoreid,
    id
  };
}
export function deleteone() {
  return {
    type: ActionTypes.Deleteone
  };
}
export function deletemore() {
  return {
    type: ActionTypes.Deletemore
  };
}
export function onselect() { // 点击单选
  return {
    type: ActionTypes.Onselect
  };
}
export function onmoreselect() { // 点击多选
  return {
    type: ActionTypes.Onmoreselect
  };
}
export function rename(name) { // 点击多选
  return {
    type: ActionTypes.Rename,
    name
  };
}
export function signtime(signstartTime, signendTime) { // 加标记
  return {
    type: ActionTypes.Signtime,
    signstartTime,
    signendTime
  };
}
export function cleansigntime() { // 清除标记
  return {
    type: ActionTypes.Cleansigntime
  };
}