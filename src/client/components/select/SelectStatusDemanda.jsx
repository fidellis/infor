import React from 'react';
import Select from './SelectModel';

const Component = props => {
    console.log('******', props.statusMovimentacao_id)
    return <Select {...props} />
};

Component.defaultProps = {
    url: '/demanda/status',
    id: 'status_id',
    label: 'Situação',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'], cache: 28800 },
};

export default Component;
