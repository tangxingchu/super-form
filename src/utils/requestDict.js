import requestApi from './request';
import { apiHost } from './config';

const getSysDictList = (dictKey, fondsCode) => {
    return requestApi(`${apiHost}/dossierWeb/sysDict/getSysDictList`, "POST", {data: {dictKey, fondsCode}});
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
const queryDictGroupName = () => {
    return requestApi(`${apiHost}/dossierWeb/sysDict/queryDictGroupName`, "POST", { data: {} });
}

export {
    listFonds,
    listDictGroupName,
    getSysDictList,
    queryDictGroupName,
}