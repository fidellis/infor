import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/rotina/status',
    id: 'status_id',
    label: 'Situação',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['id'], cache: 28800 },
};

export default Component;
