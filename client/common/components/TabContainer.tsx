import React, { useEffect } from 'react';
import styles from '../../styles/TabContainer.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux-hooks';
import { setCurrentMilestone } from '../store/slices/milestone/milestone.slice';


type TabContainerProps = {
  children: React.ReactNode;
};

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string; // 👈️ type children
};

const ActiveLink = ({ children, href }: ActiveLinkProps) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={`styles.${router.pathname === href ? 'active' : 'links'}`}>
        {children}
      </a>
    </Link>
  );
};

const TabContainer = ({ children }: TabContainerProps) => {

  const router = useRouter();
  const milestone = useAppSelector(state => state.milestone.currentMilestone)

  useEffect(() => {
  })

  return (
    <div className={styles.container}>
      <div className={styles.tabHead}>
        <div className={styles.tab}>
          <Link href="/dashboard">
            <a className={styles.active}>Dashboard</a>
          </Link>
          <Link href="/board">
            <a className={styles.active}>Board</a>
          </Link>
          <Link href="/documentation">
            <a className={styles.active}>Documentation</a>
          </Link>
           {/* <a className={styles.active}>{milestone ? milestone.title : null}</a> */}
        </div>
      </div>
      <div className={styles.tabContent}>{children}</div>
    </div>
  );
};

export default TabContainer;
