import React from 'react';
import Select from './SelectModel';

const Component = props => {
    const statusMovimentacao_id = props.statusMovimentacao_id;
    return <Select
        filterOptions={options => options.filter(o => !statusMovimentacao_id ? true : !o.statusMovimentacao_id ? false : o.statusMovimentacao_id.includes(Number(statusMovimentacao_id)))}
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
