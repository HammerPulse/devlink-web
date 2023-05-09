import styles from './index.module.scss';
import {
  Button,
  Dropdown,
  Space,
  SplitButtonGroup,
  Tag,
} from '@douyinfe/semi-ui';
import moment from 'moment';
import { Material, User } from '@/api/types/user';
import { IconTreeTriangleDown } from '@douyinfe/semi-icons';
import CustomAvatar from '../CustomAvatar';
import HoverLink from '../HoverLink';
import useUserStore from '@/store/user';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { CustomTag } from '../CustomTag';
import GroupActionBtn from './components/GroupActionBtn';

interface MaterialCardProps {
  material: Material;
  isShowAvatar?: boolean;
  displaySelfName?: boolean;
}
moment.locale('zh-cn');
export default function MaterialCard({
  material,
  isShowAvatar = false,
  displaySelfName = true,
}: MaterialCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const { getUser } = useUserStore();

  useEffect(() => {
    getUser().then((res) => {
      setUser(res);
    });
  }, []);

  const isSelf = user?.id === material.user.id;
  const username = material.user.username;

  return (
    <div className={styles.materialCard}>
      <div className={styles.materialDetail}>
        <div className={styles.materialDetailHeader}>
          <div className={styles.materialTitle}>
            {isSelf && (
              <>
                {isShowAvatar && (
                  <CustomAvatar
                    id={material.user.id}
                    style={{ width: '20px', height: '20px', marginRight: 5 }}
                    size='small'
                    username={username}
                    src={material.user?.profile?.avatar}
                  />
                )}
                <>
                  {username === user.username && displaySelfName && (
                    <>
                      <HoverLink
                        href={`/user/${material.user.id}`}
                        className={clsx(styles.name, {
                          [styles.active]: isShowAvatar,
                        })}
                        openNewTab
                      >
                        {username}
                      </HoverLink>
                      /
                    </>
                  )}
                </>
              </>
            )}
            <HoverLink
              href={`/material/${material.id}`}
              className={clsx(styles.name, {
                [styles.active]: isShowAvatar,
              })}
              openNewTab
            >
              {material.name}
            </HoverLink>
          </div>
          {isSelf && (
            <SplitButtonGroup
              style={{ marginRight: 10 }}
              aria-label='项目操作按钮组'
              className={styles.actionBtn}
            >
              <GroupActionBtn material={material} isSelf={isSelf} />
            </SplitButtonGroup>
          )}
        </div>
        <div className={styles.materialDetailBottom}>
          {material.abstract && (
            <div className={styles.abstract}>{material.abstract}</div>
          )}
          <div className={styles.tags}>
            <Space>
              {material.tags.map((tag) => (
                <CustomTag size='small' key={tag.id} href='/'>
                  {tag.name}
                </CustomTag>
              ))}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}
