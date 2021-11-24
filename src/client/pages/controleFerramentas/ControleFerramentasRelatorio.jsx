import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import DataTable from '~/components/data-table/DataTable';
import Aviso from '~/components/message/Aviso';
import Button from '~/components/Button';
import NavigationButton from '~/components/NavigationButton';
import { getRelatorio } from './controleFerramentasHook';

const columns = {
    'status.nome': {
        label: 'Status',
    },
    quantidade: {
        label: 'Quantidade',
        width: 100,
        align: 'center',
    },
};

const Component = (props) => {
    const [data, setData] = useState([]);
    const [response, loading] = getRelatorio();

    useEffect(() => {
        setData(response);
    }, [response]);

    return (
        <div>
            <DataTable
                rows={data}
                columns={columns}
                width="30%"
                exportCsv
                headerHeight={30}
            />

            {/* <NavigationButton buttons={[
                {
                    label: 'Adicionar Ferramenta',
                    onClick: () => props.history.push('/controle-ferramentas'),
                },
            ]}
            /> */}
            <br />
            <center><img src="https://diemp2.intranet.bb.com.br/arquivos/api/arquivo/2680" width="30%" /></center>
        </div>
    );
};

Component.propTypes = {};
const mapStateToProps = ({ app: { usuario } }) => ({ usuario });
const mapDispatchToProps = ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Component);
