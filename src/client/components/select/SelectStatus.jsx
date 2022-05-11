import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/controleFerramentas/status',
    id: 'status_id',
    label: 'Status',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'], cache: 28800 },
};

export default Component;
