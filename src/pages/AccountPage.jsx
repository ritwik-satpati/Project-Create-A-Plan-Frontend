import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Account from "../components/Account";

const AccountPage = () => {
  return (
    <>
      <BaseLayout menu="account">
        <Account />
      </BaseLayout>
    </>
  );
};

export default AccountPage;
