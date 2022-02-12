import { useEffect, useState } from "react";
import { Card, Skeleton, message, Button, Modal, Spin } from "antd";
import UserModel from "../models/UserModel";
import UserTable from "../components/Users/UserTable";
import UserForm from "../components/Users/UserForm";
import Clipboard from "clipboard";
const Users = () => {
  const [userList, setUserList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [formData, setFormData] = useState({});
  const [showInsertModel, setShowInsertModel] = useState(false);

  const [inserting, setInserting] = useState(false);

  const get = async () => {
    setLoadingUsers(false);
    const res = await UserModel.get();
    if (res.status == "true") {
      setUserList(
        UserModel.renderTable(res.users, editUser, deleteUser, getToken)
      );
    }

    setLoadingUsers(true);
  };

  const getToken = async (id) => {
    message.info("Please wait ...");
    const result = await UserModel.getToken(id);
    if (result.status == "true") {
      setUserToken(result.token);

  
      console.log(result.token);
    } else message.error("Error !");
  };

  const deleteUser = async (e) => {
    const res = await UserModel.deleteUser(e);

    if (res) {
      get();
      message.success("User deleted");
    } else message.error("Error");

    // const t = [];
    // for (let k = 0; k < c.length; k++) {
    //   if (userList[k].id != e) t.push(userList[k]);
    //   console.log(userList[k]);
    // }
    //setUserList(t);
  };

  const editUser = async (e) => {};

  const createUser = async (e) => {
    setInserting(true);
    const res = await UserModel.create(e.email, e.password, e.AccountType);
    if (res.status == "true") {
      setUserList([
        ...userList,
        ...UserModel.renderTable([res.user], editUser, deleteUser, getToken),
      ]);
    } else {
      message.warning(res.message);
    }
    setInserting(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Modal
        footer={null}
        onCancel={() => setShowInsertModel(false)}
        visible={showInsertModel}
      >
        <Spin tip="Loading" spinning={inserting}>
          <UserForm onFinish={(e) => createUser(e)} />
        </Spin>
      </Modal>

      <Card
        title="Users"
        extra={
          <Button onClick={() => setShowInsertModel(true)} type="primary">
            New User
          </Button>
        }
      >
        <Skeleton active={true} loading={!loadingUsers}>
          <UserTable source={userList} />
        </Skeleton>
      </Card>
    </>
  );
};

export default Users;
