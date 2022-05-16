import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import Card from '~/components/Card';
import Grid from '~/components/Grid';
import Form from '~/components/form/Form';
import { TextInput, TextArea, NumberInput, DateInput, Select } from '~/components/form/form/inputs';
import SelectUor from '~/components/select/SelectUor';
import SelectUsuario from '~/components/select/SelectUsuario';
import SelectPrioridadeDemanda from '~/components/select/SelectPrioridadeDemanda';
import SelectStatusDemanda from '~/components/select/SelectStatusDemanda';
import Dialog from '~/components/Dialog';
import BasicTable from '~/components/data-table/BasicTable';
import { getData, save, destroy } from '~/lib/api';
import TableDemanda from './Demanda';
import moment from 'moment';
//import qs from 'qs';


const Component = ({ match, message, history }) => {
  const id = Number(match.params.id);
  //const query = qs.parse(props.location.search.replace('?', ''));
  const [formEditavel, setFormEditavel] = useState(true);
  const [data, setData] = useState({ usuarioInclusao: {}, uorResponsavel: {}, movimentacoes: [], responsaveis: null, uorDestino_id: 283521 });

  async function change() {
    const response = await getData(`/demanda/demanda/${id}`);
    setData({
      ...response,
      responsaveis: response.responsaveis.map(r => r.usuario_id),
    });
  }

  useEffect(() => {
    if (id) change();
  }, []);


  function onChange({ id, value }) {
    setData({ ...data, [id]: value });
  }

  async function salvar() {
    const response = await save('/demanda', data);
    if (response) {
      message('Demanda salva com sucesso');
      atualizar(response.id);
    }
  }

  async function excluir() {
    if (confirm('Excluir?')) {
      const response = await destroy(`/demanda/demanda/${id}`);
      if (response) {
        message('Excluído com sucesso');
        voltar();
      }
    }
  }

  function atualizar(id) {
    history.push(`/demanda/edit/${id}`);
  }

  function voltar() {
    history.push(`/demandas`);
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Form
            // width="80%"
            action={salvar}
            actions={[
              // {
              //   label: 'Editar',
              //   onClick: () => setFormEditavel(!formEditavel),
              //   hide: formEditavel,
              //   // startIcon: 'edit',
              // },
              {
                type: 'submit',
                label: 'Salvar',
                hide: !formEditavel,
                startIcon: 'save',
              },
              {
                label: 'Excluir',
                onClick: () => excluir(),
                hide: !id || !formEditavel,
                startIcon: 'delete',
              },
              // {
              //   label: 'Cancelar',
              //   onClick: () => setFormEditavel(false),
              //   hide: !id || !formEditavel,
              //   startIcon: 'cancel',
              // },
              {
                label: 'Nova',
                onClick: () => atualizar(0),
                hide: !id || formEditavel,
                // startIcon: 'add',
              },
              {
                label: 'Voltar',
                onClick: voltar,
                // hide: formEditavel,
                // startIcon: 'arrow_back',
              },

            ]}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextInput
                  id="titulo"
                  label="Título"
                  value={data.titulo}
                  onChange={onChange}
                  required
                  maxLength={255}
                  disabled={!formEditavel}
                />
              </Grid>

              {!!id &&
                <Grid item xs={2}>
                  <SelectPrioridadeDemanda
                    value={data.prioridade_id}
                    onChange={onChange}
                    required
                    isDisabled={!formEditavel}
                  />
                </Grid>}

              {!!id &&
                <Grid item xs={10}>
                  <SelectUsuario
                    id="responsaveis"
                    label="Responsáveis (colocar controle de acesso)"
                    value={data.responsaveis}
                    onChange={onChange}
                    required
                    isMulti
                    isDisabled={!formEditavel}
                  />
                </Grid>}

              {!id &&
                <Grid item xs={4}>
                  <SelectUor
                    id="uorDestino_id"
                    label="UOR Destino"
                    value={data.uorDestino_id}
                    onChange={onChange}
                    required
                  />
                </Grid>}

              {!id &&
                <Grid item xs={12}>
                  <TextArea
                    id="descricao"
                    label="Descrição"
                    value={data.descricao}
                    onChange={onChange}
                    rows={10}
                    required
                  />
                </Grid>}

            </Grid>
          </Form>
        </Grid>

      </Grid >
    </div>
  );
};

const mapDispatchToProps = ({ message });

export default connect(() => { }, mapDispatchToProps)(Component);
