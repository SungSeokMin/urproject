import React from 'react';
import { useSelector } from 'react-redux';
import Write from '../components/Write';
import { RootState } from '../modules';
import { RouteComponentProps, withRouter } from 'react-router';

function WriteContainer(props: RouteComponentProps) {
  const { nickname } = useSelector((state: RootState) => state.user);

  return <Write nickname={nickname} />;
}

export default withRouter(WriteContainer);
