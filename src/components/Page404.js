import React from "react";
import {Result} from 'antd';

const Page404 = (props) => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
      ,
    </div>
  );
}

export default Page404;
