import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/rotina/status',
    id: 'status_id',
    label: 'Situação',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'] },
};

export default Component;
