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
const getValueByDictKey = (params)=>{
    console.log(...params);
    return requestApi(`${apiHost}/dossierWeb/sysDict/getValueByDictKey`, "POST", {data:{...params}});
}
/**
 * 保存表单
 * @param {*} params 
 */
const saveForm = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysCateForm/insertData`, "POST", {data: {...params}});
}

/**
 * 查询机构
 * @param {*} params 
 */
const getSysOrganizationList = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysOrganization/getSysOrganizationList`, "POST", { data: { ...params} });
}

/**
 * 新增动态表单
 * @param {*} params 
 */
const insertFormData = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysCateTable/insertData`, "POST", { data: { ...params} });
}

/**
 * 修改动态表单
 * @param {*} params 
 */
const updateFormData = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysCateTable/updateData`, "POST", { data: { ...params} });
}

/**
 * 删除动态表单
 * @param {*} params 
 */
const deleteFormData = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysCateTable/deleteData`, "POST", { data: { ...params} });
}

/**
 * 查询数据
 * @param {*} params 
 */
const queryFormData = (params) => {
    return requestApi(`${apiHost}/dossierWeb/sysCateForm/selectData`, "POST", { data: { ...params } });
}

const infoInformationselectByList = ()=>{
    return requestApi(`${apiHost}/dossierWeb/infoInformation/selectByList`, "POST", { data: {} });
}

/**
 * 删除数据
 * @param {*} params 
 */
const deleteInfoInformation=(params)=>{
    return requestApi(`${apiHost}/dossierWeb/infoInformation/deleteInfoInformation`, "POST", { data: {...params} });
}


/**
 * 新增数据
 * @param {*} params 
 */
const insertInfoData = (params) => {
    return requestApi(`${apiHost}/dossierWeb/infoInformation/insertInfoInformation`, "POST", { data: { ...params} });
}

/**
 * 修改数据
 * @param {*} params 
 */
const updateInfoData = (params) => {
    return requestApi(`${apiHost}/dossierWeb/infoInformation/updateInfoInformation`, "POST", { data: { ...params} });
}


export {
    insertInfoData,
    updateInfoData,
    listFonds,
    listDictGroupName,
    getSysDictList,
    saveForm,
    getSysOrganizationList,
    insertFormData,
    updateFormData,
    deleteFormData,
    queryFormData,
    getValueByDictKey,
    infoInformationselectByList,
    deleteInfoInformation,
}