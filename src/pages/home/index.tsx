import { Button, Highlight } from '@douyinfe/semi-ui';
import styles from './index.module.scss';
import { IconTerminal } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';

export default function Home() {
  const { push } = useRouter();
  const sloganSourceString = '提效利器';
  const sloganSearchWords = ['提效'];

  const descriptionSourceString =
    'Less Code, CLI Web Service 并驾齐驱，我们正在雕琢的，可能就是下一个划时代的物料平台。';
  const descriptionSearchWords = ['Less', 'CLI', 'Web', 'Service', '划时代'];
  return (
    <main className={styles.welcome}>
      <div className={styles.banner}>
        <div className={styles.bannerContentLeft}>
          <div className={styles.slogan}>
            <Highlight
              sourceString={sloganSourceString}
              searchWords={sloganSearchWords}
              highlightStyle={{
                borderRadius: 6,
                marginLeft: 4,
                marginRight: 4,
                paddingLeft: 4,
                paddingRight: 4,
                backgroundColor: 'var(--semi-color-primary)',
                color: 'rgba(var(--semi-white), 1)',
              }}
            />
          </div>
          <div className={styles.description}>
            <Highlight
              sourceString={descriptionSourceString}
              searchWords={descriptionSearchWords}
              highlightStyle={{
                borderRadius: 6,
                marginLeft: 4,
                marginRight: 4,
                paddingLeft: 4,
                paddingRight: 4,
                backgroundColor: 'var(--semi-color-primary)',
                color: 'rgba(var(--semi-white), 1)',
              }}
            />
          </div>
          <div className={styles.operation}>
            <Button
              iconPosition='left'
              icon={<IconTerminal />}
              type='primary'
              theme='solid'
              className={styles.btn}
              onClick={() => push('/login')}
            >
              开始使用
            </Button>
          </div>
        </div>
        <div className={styles.bannerContentRight}>
          <img src='https://qiniuyun.devlink.wiki/0550da395b0a2c8e14d14d0dee0c227a1310aa157862ac8c20b4706409af6d1a.png' />
        </div>
      </div>
    </main>
  );
}
