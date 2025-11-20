import { Spin } from 'antd';
const contentStyle = {
  margin: 50,
};
const content = <div style={contentStyle} />;
const Loader = () => (
      <Spin tip="Cargando clientes..." size="large">
            {content}
      </Spin>
);
export default Loader;