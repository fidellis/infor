import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/demanda/prioridade',
    id: 'prioridade_id',
    label: 'Prioridade',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['id'], cache: 28800 },
};

export default Component;
