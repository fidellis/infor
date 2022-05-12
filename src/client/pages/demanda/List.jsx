import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '~/store/filter';
import DataTable from '~/components/data-table/DataTable';
import NavigationButton from '~/components/NavigationButton';
import SelectStatusDemanda from '~/components/select/SelectStatusDemanda';

const Component = ({ history, filter, ...props }) => (
  <div>
    <DataTable
      url="/demanda"
      params={{ ...filter.demanda, order: ['id'] }}
      onClick={({ row }) => history.push(`/demanda/${row.id}`)}
      count
      columns={{
        id: {
          label: '#',
          search: true,
          width: 50,
          type: 'NUMBER',
        },
        dataHoraInclusao: {
          label: 'Data',
          type: 'DATE',
          width: 100,
        },
        titulo: {
          label: 'Título',
          search: true,
        },
        'status.nome': {
          label: 'Situação',
          search: true,
          lookup: true,
          width: 200,
        },
        'uorInclusao.nome': {
          label: 'UOR Solicitante',
          search: true,
          lookup: true,
          width: 250,
        },
        'usuarioInclusao.nome': {
          label: 'Usuário Inclusão',
          search: true,
          lookup: true,
          width: 250,
        },
      }}
    // actions={[
    //   <SelectStatusDemanda
    //     label=""
    //     value={filter.demanda.status_id}
    //     onChange={(e) => props.setFilter({ ...e, filter: 'demanda' })}
    //     isMulti
    //     style={{ minWidth: 300 }} />
    // ]}
    />

    <NavigationButton buttons={[{
      label: 'Adicionar',
      onClick: () => history.push('/demanda/edit/0'),
    }]}
    />
  </div>
);

const mapStateToProps = ({ filter }) => ({ filter });
const mapDispatchToProps = ({ setFilter });

export default connect(mapStateToProps, mapDispatchToProps)(Component);
