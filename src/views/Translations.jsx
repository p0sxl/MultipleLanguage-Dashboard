import { useEffect, useState } from "react";
import {
  Select,
  Spin,
  Result,
  Card,
  message,
  Row,
  Col,
  Button,
  Skeleton,
  Modal,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { If, Else, Then } from "react-if";
import ProjectModel from "../models/ProjectModel";
import TranslationTable from "../components/Translation/TranslationTable";
import TranslationFilter from "../components/Translation/TranslationFilter";
import TranslationForm from "../components/Translation/TranslationForm";
import TranslationModel from "../models/TranslationModel";
const { Option } = Select;
const Translations = () => {
  const [loadingProject, setLoadingProject] = useState(false);
  const [translations, setTranslations] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(-1);
  const [projects, setProjects] = useState([]);
  const [langs, setLangs] = useState([]);
  const [infoMessage, setInfoMessage] = useState("Please select project");
  const [selectedLang, setSelectedLang] = useState(-1);
  const [formData, setFormData] = useState({});
  const [visibleForm, setVisibleForm] = useState(false);
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  const search = (e) => {
    let temp = [];
    for (let i = 0; i < originalData.length; i++) {
      let a =
        originalData[i]["Key"].toString().search(new RegExp(e), "i") == -1
          ? false
          : true;
      //let b = originalData[i]['accountId'].toString().search(new RegExp(e)) == -1 ? false : true;
      let c =
        originalData[i]["ProjectId"].toString().search(new RegExp(e, "i")) == -1
          ? false
          : true;
      let d =
        originalData[i]["LangId"].toString().search(new RegExp(e, "i")) == -1
          ? false
          : true;
      let f =
        originalData[i]["Value"].toString().search(new RegExp(e, "i")) == -1
          ? false
          : true;
      if (a || c || d || f) temp.push(originalData[i]);
    }
    setTranslations(temp);
  };

  const getProject = async () => {
    const result = await ProjectModel.get();
    if (result.status == "true") {
      setProjects(result.projects);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    if (selectedProject != -1 && selectedLang != -1) {
      getTranslations();
    }
  }, [selectedProject, selectedLang]);

  const getTranslations = async () => {
    setLoadingTranslation(true);
    const res = await TranslationModel.get(selectedProject, selectedLang);

    if (res.status == "true") {
      const rendered = TranslationModel.renderTable(res.translation);
      setTranslations(rendered);
      setOriginalData(rendered);
      setLoadingTranslation(false);
    } else {
      message.info("Getting error !");
    }
  };



  const selectProject = (project) => {
    projects.map((item,index) => {
      if(item._id == project) {
        setSelectedProject(project);
        setLangs(item.langs)
      }
    })
    //console.log(e)
    //;
  }




  const insert = async () => {
    let obj = [];
    for (let i = 0; i < langs.length; i++) {
      if (!formData[langs[i]]) {
        formData[langs[i]] = "";
      }

      obj.push({
        key: formData.key,
        value: formData[langs[i]],
        projectId: selectedProject,
        langId: langs[i],
      });
    }

    obj = JSON.stringify(obj);
    const result = await TranslationModel.create(obj);
    console.log(result);
    if (result.status == "true") {
      message.info("Successfully");
      getTranslations();
    } else {
      message.error(obj.message);
    }

    // [{"key":"home","value":"Anasayfa","projectId" : "d","langId" : "tr"},{"key":"home","value":"NL Home","projectId" : "d","langId" : "nl"}]
  };

  return (
    <div>
      <Modal
        visible={visibleForm}
        onCancel={() => setVisibleForm(false)}
        onOk={() => insert()}
        title="New Translation"
      >
        <TranslationForm onChange={setFormData} langs={langs} />
      </Modal>

      <Spin spinning={loadingProject}>
        <Select
          onChange={(e) => selectProject(e)}
          className=""
          placeholder="Select Project"
        >
          {projects.map((item, index) => (
            <Option key={index} value={item._id}>
              {item.projectName}
            </Option>
          ))}
        </Select>
        <Select
          onChange={(e) => setSelectedLang(e)}
          className="ml-3"
          placeholder="Lang"
        >
          {langs.map((lang, index) => (
            <Option key={index} value={lang}>
              {lang.toUpperCase()}
            </Option>
          ))}
        </Select>
      </Spin>

      <If condition={selectedProject == -1 || selectedLang == -1}>
        <Then>
          <Card className="mt-3">
            <Result title={infoMessage} />
          </Card>
        </Then>

        <Else>
          {/* <TranslationFilter /> */}
          <div className="mt-5 mb-3 relative">
            <div className="absolute right-[20px] z-10 top-[3px]">
              <SearchOutlined />
            </div>
            <Input
              onChange={(e) => search(e.target.value)}
              placeholder="Search"
            />
          </div>
          <Row gutter={16}>
            <Col lg={24}>
              <Card className="mt-3">
                <Skeleton active={true} loading={loadingTranslation}>
                  <div className="flex justify-end">
                    <Button onClick={() => setVisibleForm(true)} type="primary">
                      New
                    </Button>
                  </div>
                  <TranslationTable source={translations} />
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </Else>
      </If>
    </div>
  );
};

export default Translations;
