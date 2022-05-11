import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/rotina/apresentacao',
    id: 'apresentacao_id',
    label: 'Apresentação',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['id'], cache: 28800 },
};

export default Component;
