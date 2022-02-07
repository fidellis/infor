import React from 'react';
import { Select } from '~/components/form/form/inputs';

const Component = props => <Select
    {...props}
    options={[
        {
            id: 1,
            nome: 'Janeiro'
        },
        {
            id: 2,
            nome: 'Feveriro'
        },
        {
            id: 3,
            nome: 'Março'
        },
        {
            id: 4,
            nome: 'Abril'
        },
        {
            id: 5,
            nome: 'Maio'
        },
        {
            id: 6,
            nome: 'Junho'
        },
        {
            id: 7,
            nome: 'Julho'
        },
        {
            id: 8,
            nome: 'Agosto'
        },
        {
            id: 9,
            nome: 'Setembro'
        },
        {
            id: 10,
            nome: 'Outubro'
        },
        {
            id: 11,
            nome: 'Novembro'
        },
        {
            id: 12,
            nome: 'Dezembro'
        },

    ]}
/>;

Component.defaultProps = {
    // url: '/controleFerramentas/status',
    id: 'mes',
    label: 'Mês',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['id'] },
};

export default Component;
