import React from 'react';
import { useSelector } from 'react-redux';
import Write from '../components/Write';
import { RootState } from '../modules';
import { RouteComponentProps, withRouter } from 'react-router';
import NotFound from '../pages/NotFound';

function WriteContainer(props: RouteComponentProps) {
  const { nickname } = useSelector((state: RootState) => state.user);
  let { data } = useSelector((state: RootState) => state.posts.post);

  const { path } = props.match;

  if (path === '/post/modify/:id') {
    // nickname은 login할때 redux store에 저장되는 닉네임
    // data는 해당 Post의 작성자
    if (!data || nickname !== data.nickname) {
      return <NotFound {...props} />;
    }
  }

  return <Write nickname={nickname} data={data} {...props} />;
}

export default withRouter(WriteContainer);
