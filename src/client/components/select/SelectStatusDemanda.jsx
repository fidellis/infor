import React from 'react';
import Select from './SelectModel';

const Component = ({ params, ...props }) => {
    return <Select
        params={{ order: ['id'], cache: 28800, ...params }}
        {...props}

    />
};

Component.defaultProps = {
    url: '/demanda/status',
    id: 'status_id',
    label: 'Status',
    optionValue: 'id',
    optionLabel: 'nome',
};

export default Component;
