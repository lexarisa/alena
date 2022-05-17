import React, { useEffect } from 'react';
import { MainDocumentation } from '../../common/components/MainDocumentation';
import DashboardLayout from '../../common/components/DashboardLayout';
import TabContainer from '../../common/components/TabContainer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAppDispatch } from '../../common/store/hooks/redux-hooks';
import {
  setDocuments,
  setProjectDocuments,
} from '../../common/store/slices/documentation/documentation.slice';

const DocumentationPage = ({
  dataMilestone,
}: // dataProject,
// data,
// id,
InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDocuments(dataMilestone[0].documents));
    // dispatch(setProjectDocuments(dataProject[0].documents));
  });

  return (
    <DashboardLayout>
      <TabContainer>
        <MainDocumentation />
      </TabContainer>
    </DashboardLayout>
  );
};

export default DocumentationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const resMilestone = await fetch(`http://localhost:3001/documentation/${id}`); // for milestone
  const dataMilestone = await resMilestone.json();

  return {
    props: { dataMilestone, id: context.query },
    notFound: false,
  };
};
