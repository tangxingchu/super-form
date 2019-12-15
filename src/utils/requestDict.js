import requestApi from './request';
import { apiHost } from './config';

/**
 * 查询具体字典项
 * @param {*} dictKey 
 * @param {*} fondsCode 
 */
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

/**
 * 查询所有字典分组
 */
const listDictGroupName = () => {
    return requestApi(`${apiHost}/dossierWeb/sysDict/queryDictGroupName`, "POST", {data: {}});
}

const saveForm = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysCateForm/insertData`, "POST", {data: {...params}});
}

const queryDictGroupName = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysOrganization/getSysOrganizationList`, "POST", { data: { ...params} });
}
export {
    listFonds,
    listDictGroupName,
    getSysDictList,
    saveForm,
    queryDictGroupName,
}