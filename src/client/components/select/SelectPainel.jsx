import React, { useState, useEffect } from 'react';
import { getData } from '~/lib/api';
import { Select } from '~/components/form/form/inputs';

const Component = ({ url, params, painel, ...props }) => {
    const [options, setOptions] = useState([]);

    async function change() {
        const data = await getData(url, params);
        setOptions(data);
    }

    useEffect(() => {
        change();
    }, [null, painel])

    return (
        <Select {...props} options={options} isOptionDisabled={(option) => props.values.includes(option.id)} />
    )
};

Component.defaultProps = {
    url: '/painel/painel',
    // id: 'paineis',
    label: 'Painéis',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'] },
};

export default Component;