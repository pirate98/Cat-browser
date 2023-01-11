import React from 'react';
import { Spin, Space } from 'antd';

const Spinner: React.FC = () => {
    return (
        <Space direction="vertical" style={{ width: '100%', paddingTop: 300 }}>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </Space>
    );
};

export default Spinner;
