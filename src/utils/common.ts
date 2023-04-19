import { getInfo } from '@/api/user';
import type { User } from '@/api/types/user';
import { Modal, Toast } from '@douyinfe/semi-ui';
import type { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import type { Dispatch, SetStateAction } from 'react';
import { STORGE_USER_INFO } from './const';

// 通用的正确弹窗
export function ToastSuccess(content: string, duration = 4) {
  return Toast.success({
    content: content,
    duration,
    showClose: false,
  });
}

// 通用的信息弹窗
export function ToastInfo(
  content: string,
  duration = 3,
  icon?: React.ReactNode
) {
  return Toast.info({
    content: content,
    duration,
    showClose: false,
    icon,
  });
}

// 通用的错误弹窗
export function ToastError(content: string, duration = 4) {
  return Toast.error({
    content: content || 'Error',
    duration,
    showClose: false,
  });
}
// 通用的警告弹窗
export function ToastWaring(content: string, duration = 4) {
  return Toast.warning({
    content: content || 'Warning',
    duration,
    showClose: false,
  });
}
// 注意：【confirmFun】和【cancelFun】，如果是 http请求，则需要 return http 请求，如果不是 Promise，则在方法前面加 async，即可
export function execConfirm(
  confirmFun: () => Promise<void>,
  cancelFun?: () => Promise<void>,
  msg?: string
) {
  Modal.confirm({
    title: '提示',
    content: msg || '确定执行操作？',
    maskClosable: false,
    onOk: () => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        if (confirmFun) {
          return await confirmFun()
            .then(() => resolve(null))
            .catch(() => resolve(null));
        }
        return resolve(null); // 关闭 confirm弹窗
      });
    },
    onCancel() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        if (cancelFun) {
          return await cancelFun()
            .then(() => resolve(null))
            .catch(() => resolve(null));
        }
        return resolve(null); // 关闭 confirm弹窗
      });
    },
  });
}

// modal 点击各种关闭按钮时
export function onModalCancel(
  setModalVisible: Dispatch<SetStateAction<boolean>>,
  formApi: FormApi<any> | undefined,
  initForm: any
) {
  // 判断表单是否修改
  let flag = false;
  for (const key in formApi?.getValues()) {
    if (
      JSON.stringify(initForm[key]) !==
      JSON.stringify(formApi?.getValues()[key])
    ) {
      flag = true;
      break;
    }
  }

  // 如果没有修改，则关闭 modal
  if (!flag) {
    setModalVisible(false);
    return;
  }

  // 否则进行提示
  execConfirm(
    async () => {
      setModalVisible(false);
    },
    undefined,
    '表单数据已被修改，确定关闭吗？'
  );
}

/**
 *
 * @param length
 * @returns 随机字符串
 */
export function randomString(length = 6) {
  const BASE_CHAR_NUMBER = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let resStr = '';
  for (let index = 0; index < length; index++) {
    resStr += BASE_CHAR_NUMBER.charAt(Math.floor(Math.random() * 36));
  }
  return resStr;
}

export function getUserInfo(): Promise<User> {
  return new Promise((resolve, reject) => {
    let userinfo = sessionStorage.getItem(STORGE_USER_INFO);
    userinfo = userinfo && JSON.parse(userinfo);
    userinfo && resolve(userinfo as unknown as User);
    getInfo().then((res) => {
      if (res) {
        const { status } = res.data;
        if (status === 0) {
          const { data } = res.data;
          const userinfo: User = data;
          sessionStorage.setItem(STORGE_USER_INFO, JSON.stringify(userinfo));
          resolve(userinfo);
        } else {
          reject({
            error: ' 获取失败',
          });
        }
      }
    });
  });
}
