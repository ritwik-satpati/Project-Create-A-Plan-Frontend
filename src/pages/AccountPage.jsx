import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Account from "../components/Account";
import MetaData from "../utils/MetaData";

const AccountPage = () => {
  return (
    <>
      <MetaData page="Account" keywords="Accounts" />

      <BaseLayout menu="account">
        <Account />
      </BaseLayout>
    </>
  );
};

export default AccountPage;
