import React from 'react';
import Select from './SelectModel';

const Component = props => {
    const tipoMovimentacao_id = props.tipoMovimentacao_id;
    return <Select
        filterOptions={options => options.filter(o => !tipoMovimentacao_id ? true : !o.tipoMovimentacao_id ? false : o.tipoMovimentacao_id.includes(Number(tipoMovimentacao_id)))}
        {...props}

    />
};

Component.defaultProps = {
    url: '/demanda/status',
    id: 'status_id',
    label: 'Situação',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['id'], cache: 0 },
};

export default Component;
