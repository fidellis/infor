import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} isOptionDisabled={(option) => props.values.includes(option.id)} />;

Component.defaultProps = {
    url: '/painel/painel',
    // id: 'paineis',
    label: 'Painéis',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'] },
};

export default Component;
