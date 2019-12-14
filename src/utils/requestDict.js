import requestApi from './request';
import { apiHost } from './config';

export default (dictKey) => {
    return requestApi(`${apiHost}/dossierWeb/sysDict/getSysDictList`, "POST", {data: {dictKey}});
}

/**
 * 查询全宗 分页
 * @param {*} params 
 */
const listFonds = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysFonds/selectByList`, "POST", {data: {...params}});
}

const listDictGroupName = () => {
    return requestApi(`${apiHost}/dossierWeb/sysDict/queryDictGroupName`, "POST", {data: {}});
}

export {
    listFonds,
    listDictGroupName,
}