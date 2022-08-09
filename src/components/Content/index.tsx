import React, { ReactElement } from 'react';

import styles from './styles.module.scss';

type ContentProps = {
  children: ReactElement;
};

export function Content(props: ContentProps) {
  return <div className={styles.container}>{props.children}</div>;
}
