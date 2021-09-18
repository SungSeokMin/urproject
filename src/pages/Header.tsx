import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';

type HeaderProps = {
  signIn: boolean;
  signUp: boolean;
  showLoginModal: () => void;
  showSignUpModal: () => void;
  notShow: () => void;
};

function Header({
  signIn,
  signUp,
  showLoginModal,
  showSignUpModal,
  notShow,
}: HeaderProps) {
  return (
    <HeaderContainer
      signIn={signIn}
      signUp={signUp}
      showLoginModal={showLoginModal}
      showSignUpModal={showSignUpModal}
      notShow={notShow}
    />
  );
}

export default Header;
