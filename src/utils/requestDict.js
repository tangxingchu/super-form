import requestApi from './request';
import { apiHost } from './config';

export default (dictKey) => {
    return requestApi(`${apiHost}/sysDict/getSysDictList`, "POST", {data: {dictKey}});
}