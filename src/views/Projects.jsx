import { useEffect, useState } from "react";
import { Card, message, Button, Modal, Skeleton } from "antd";
import ProjectTable from "../components/Projects/ProjectTable";
import ProjectModel from "../models/ProjectModel";
import ProjectForm from "../components/Projects/ProjectForm";
const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [formTitle, setFormTitle] = useState("New Project");
  const [formData, setFormData] = useState({});
  const [okText, setOkText] = useState("Create");
  const [loading, setLoading] = useState(false);

  const create = async () => {
    if (!formData.langs.length) return message.info("Lang is required !");
    if (formData.selectedAccount == -1)
      return message.info("Account is required !");
    if (formData.projectName == "")
      return message.info("Project Name is required !");

    const result = await ProjectModel.create(
      formData.selectedAccount,
      formData.projectName,
      formData.langs
    );
    if (result.status == "true") {
      const data = ProjectModel.renderTable([result.project],edit,destroy);
      setProjectList([data[0], ...projectList]);
    }

    setVisibleForm(false);
  };

  const get = async () => {
    setLoading(true);
    const r = await ProjectModel.get();
    if (r.status == "true") {
      setProjectList(ProjectModel.renderTable(r.projects,edit,destroy));
      setLoading(false);
    } else {
      message.warning("Error");
    }
  };

  const edit = () => {};

  const destroy = async(e) => {
    const res = await ( ProjectModel.destroy(e));
    if(res.status == 'true') {
      message.success("Project deleted !");
      get();
      //setProjectList(projectList.filter((item) => item.order != e))
      //setProjectList();
    }else message.info("Error");

  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Modal
        title={formTitle}
        visible={visibleForm}
        onOk={() => create()}
        onCancel={() => setVisibleForm(false)}
        okText={okText}
      >
        <ProjectForm onChange={setFormData} />
      </Modal>

      <Card
        extra={
          <Button type="primary" onClick={() => setVisibleForm(true)}>
            New Project
          </Button>
        }
        title="Projects"
      >
        <Skeleton active={true} loading={loading}>
          <ProjectTable source={projectList} />
        </Skeleton>
      </Card>
    </>
  );
};

export default Projects;
