import React from 'react';
import styles from '../styles/projectPage.module.css';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ITask from '../common/types/ITask';
import Link from 'next/link';
import Cryptr from 'cryptr';

const project = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <div>
          <h1>Welcome to Alena, user</h1>
        </div>
        <div className={styles.selectCard}>
          <div className={styles.addButton}>+</div>
          <p>Create a new project</p>
        </div>
        <div>
          {data &&
            data.map((item: ITask) => (
              <div key={String(item.id)}>
                <Link href={{ pathname: '/dashboard', query: { id: +item.id } }}>
                  <div className={styles.selectCard}>
                    <p>Your Project</p>
                    <p>{item.title}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default project;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const cryptr = new Cryptr(`${process.env.ENC_SECRET}`);

  console.log('yeeeees');

  const token = await cryptr.decrypt(`${context.query.token}`);

  console.log(token);
  const res = await fetch(`${process.env.BASEURL}/project/${token}`);

  const data = await res.json();

  return { props: { data: [data] }, notFound: false };
};