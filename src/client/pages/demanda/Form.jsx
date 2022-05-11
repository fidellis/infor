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
import TableDemanda from './TableDemanda';
import moment from 'moment';
//import qs from 'qs';

const Component = ({ match, message, history }) => {
  const id = Number(match.params.id);
  //const query = qs.parse(props.location.search.replace('?', ''));
  const [formEditavel, setFormEditavel] = useState(!id);
  const [dialogDescricao, setDialogDescricao] = useState(false);
  const [demanda, setDemanda] = useState({ usuarioInclusao: {}, uorResponsavel: {}, movimentacoes: [], responsaveis: null });
  const [descricao, setDescricao] = useState({ movimentacao: {} });
  const [descricoes, setDescricoes] = useState([]);

  async function change() {
    const [dt, desc] = await getData(`/demanda/demanda/${id}`);
    setDemanda({
      ...dt,
      responsaveis: dt.responsaveis.map(r => r.usuario_id),
    });
    setDescricoes(desc);
  }

  useEffect(() => {
    if (id) change();
  }, []);


  function onChangeDemanda({ id, value }) {
    setDemanda({ ...demanda, [id]: value });
  }

  function onChangeDescricao({ id, value }) {
    setDescricao({ ...descricao, [id]: value });
  }

  async function salvarDemanda() {
    const response = await save('/demanda', { ...demanda, ...descricao });
    if (response) {
      message('Demanda salva com sucesso');
      atualizar(response.id);
    }
  }

  async function salvarDescricao() {
    const response = await save('/demanda/descricao', descricao);
    if (response) {
      message('Observação salva com sucesso');
      atualizar(id);
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
    history.push(`/demanda/${id}`);
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
            action={salvarDemanda}
            actions={[
              {
                label: 'Editar',
                onClick: () => setFormEditavel(!formEditavel),
                hide: formEditavel,
                // startIcon: 'edit',
              },
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
              {
                label: 'Cancelar',
                onClick: () => setFormEditavel(false),
                hide: !id || !formEditavel,
                startIcon: 'cancel',
              },
              {
                label: 'Nova',
                onClick: () => atualizar(0),
                hide: !id || formEditavel,
                // startIcon: 'add',
              },
              {
                label: 'Voltar',
                onClick: voltar,
                hide: formEditavel,
                // startIcon: 'arrow_back',
              },

            ]}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextInput
                  id="titulo"
                  label="Título"
                  value={demanda.titulo}
                  onChange={onChangeDemanda}
                  required
                  maxLength={255}
                  disabled={!formEditavel}
                />
              </Grid>

              {!!id &&
                <Grid item xs={2}>
                  <SelectPrioridadeDemanda
                    value={demanda.prioridade_id}
                    onChange={onChangeDemanda}
                    required
                    isDisabled={!formEditavel}
                  />
                </Grid>}

              {!!id &&
                <Grid item xs={10}>
                  <SelectUsuario
                    id="responsaveis"
                    label="Responsáveis"
                    value={demanda.responsaveis}
                    onChange={onChangeDemanda}
                    required
                    isMulti
                    isDisabled={!formEditavel}
                  />
                </Grid>}

              {!id &&
                <Grid item xs={4}>
                  <SelectUor
                    id="uorResponsavel_id"
                    label="UOR Destino"
                    value={demanda.uorResponsavel_id}
                    onChange={onChangeDemanda}
                    required
                  />
                </Grid>}

              {!id &&
                <Grid item xs={12}>
                  <TextArea
                    id="descricao"
                    label="Descrição"
                    value={descricao.descricao}
                    onChange={onChangeDescricao}
                    required
                    rows={10}
                  />
                </Grid>}

            </Grid>
          </Form>
        </Grid>

        <Grid item xs={12}>
          {!!id &&
            <TableDemanda
              descricoes={descricoes}
              onClickAction={p => {
                setDescricao(p);
                setDialogDescricao(true);
              }}
              columns={{
                // id: {
                //   type: 'INTEGER',
                //   label: '#',
                // },
                'status.nome': {
                  label: 'Status',
                },
                'uorOrigem.nome': {
                  label: 'UOR Origem',
                },
                'uorDestino.nome': {
                  label: 'UOR Destino',
                },
                'usuarioInclusao.nome': {
                  label: 'Funci',
                },
                dataHoraInclusao: {
                  type: 'DATETIME',
                  label: 'Data',
                },
              }} />}
        </Grid>
      </Grid >

      <Dialog open={dialogDescricao} onClose={() => {
        setDialogDescricao(false);
        setDescricao({});
      }}>
        <div style={{ width: 1200 }}>
          <Form
            actions={[
              {
                // type: 'submit',
                label: 'Salvar',
                startIcon: 'save',
                onClick: salvarDescricao,
              },
              {
                label: 'Cancelar',
                onClick: () => setDialogDescricao(false),
                startIcon: 'cancel',
              },
            ]}
          >
            <Grid container spacing={1}>
              {descricao.id &&
                <Grid item xs={3}>
                  <SelectStatusDemanda
                    value={descricao.status_id}
                    onChange={onChangeDescricao}
                    required
                    statusMovimentacao_id={descricao.movimentacao.status_id}
                  />
                </Grid>}

              <Grid item xs={12}>
                <TextArea
                  id="descricao"
                  label="Descrição"
                  value={descricao.descricao}
                  onChange={onChangeDescricao}
                  required
                  rows={10}
                />
              </Grid>
            </Grid>
          </Form>
        </div>
      </Dialog>


    </div>
  );
};

const mapDispatchToProps = ({ message });

export default connect(() => { }, mapDispatchToProps)(Component);
