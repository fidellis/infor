import React from 'react';
import Select from './SelectModel';

const Component = ({ ...props }) => {
    const params = props.params;
    return <Select
        params={{ order: ['motivoMovimentacao'], motivoMovimentacao: { $not: null }, cache: 0, ...params }}
        {...props}

    />
};

Component.defaultProps = {
    url: '/demanda/status',
    id: 'status_id',
    label: 'Motivo',
    optionValue: 'id',
    optionLabel: 'motivoMovimentacao',
};

export default Component;
