import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import moment from 'moment';
import Form from '~/components/form/Form';
import Section from '~/components/form/Section';
import BasicTable from '~/components/data-table/BasicTable';
import { TextInput, NumberInput, DateInput, Select, TextArea, Switch } from '~/components/form/form/inputs';
import Dialog from '~/components/Dialog';
import SelectPainel from '~/components/select/SelectPainel';
import SelectTipoRotina from '~/components/select/SelectTipoRotina';
import SelectStatusRotina from '~/components/select/SelectStatusRotina';
import SelectFerramentaRotina from '~/components/select/SelectFerramentaRotina';
import SelectApresentacaoRotina from '~/components/select/SelectApresentacaoRotina';
import SelectTagRotina from '~/components/select/SelectTagRotina';
import SelectPeriodicidadeRotina from '~/components/select/SelectPeriodicidadeRotina';
import SelectTipoPeriodicidadeRotina from '~/components/select/SelectTipoPeriodicidadeRotina';
import SelectTipoResponsavel from '~/components/select/SelectTipoResponsavel';
import SelectDiaSemana from '~/components/select/SelectDiaSemana';
import SelectMes from '~/components/select/SelectMes';
import Icon from '~/components/icons/Icon';
import Button from '~/components/Button';
import { Grid } from '@material-ui/core';
import { save, destroy } from '~/lib/api';
import qs from 'qs';
import { getDado } from './hook';
import FormPainel from '../paineis/Form';
import FormResponsavel from './FormResponsavel';

const ID_PERIODICIDADE_SEMANAL = 2;
const ID_PERIODICIDADE_MENSAL = 3;
const ID_PERIODICIDADE_TRIMESTRAL = 4;
const ID_PERIODICIDADE_SEMESTRAL = 5;
const ID_PERIODICIDADE_ANUAL = 6;

const Component = (props) => {

  const id = Number(props.match.params.id);
  const response = getDado({ id });
  const [data, setData] = useState(response);
  const [painel, setPainel] = useState({});
  const [formEditavel, setFormEditavel] = useState(!id);
  const [openFormPainel, setOpenFormPainel] = useState(false);
  const [openFormResponsavel, setOpenFormResponsavel] = useState(false);
  const descricao = data.descricao || '';

  useEffect(() => {
    setData(response);
  }, [response]);

  const columns = {
    painel: {
      id: {
        label: '#',
      },
      nome: {
        label: 'Nome'
      },
      'tipo.nome': {
        label: 'Tipo'
      },
      'status.nome': {
        label: 'Situação'
      },
      dataCriacao: {
        label: 'Data',
        type: 'DATE',
      },
      link: {
        label: 'Link',
        cellRenderer: ({ row }) => <a href={row.link} target="_blank">{row.link}</a>
      },
      delete: {
        cellRenderer: ({ row }) => <Icon onClick={() => onCDeletePainel(row)}>delete</Icon>,
        style: { width: 5 },
        hide: !formEditavel,
      },
    },
    responsavel: {
      id: {
        label: 'Matrícula'
      },
      nome: {
        label: 'Funcionário'
      },
      tipo_id: {
        label: 'Tipo',
        cellRenderer: ({ row }) => <SelectTipoResponsavel
          id="tipo_id"
          value={row.tipo_id}
          label=""
          onChange={option => onChangeTipoResponsavel(row, option)}
        />
      },
      delete: {
        cellRenderer: ({ row }) => <Icon onClick={() => onCDeleteResponsavel(row)}>delete</Icon>,
        style: { width: 5 },
        hide: !formEditavel,
      },
    }
  }

  function onChange({ id, value }) {
    setData({ ...data, [id]: value });
  }

  function onChangePeriodos({ value }) {
    setData({ ...data, periodos: value.map(v => ({ mes: v })) });
  }

  function getError() {
    const periodicidade_id = Number(data.periodicidade_id);
    if (periodicidade_id === ID_PERIODICIDADE_TRIMESTRAL && data.periodos.length !== 4) {
      return 'Selecione 4 meses';
    } else if (periodicidade_id === ID_PERIODICIDADE_SEMESTRAL && data.periodos.length !== 2) {
      return 'Selecione 2 meses';
    } else if (periodicidade_id === ID_PERIODICIDADE_ANUAL && data.periodos.length !== 1) {
      return 'Selecione apenas 1 mês';
    }
    return null;
  }

  async function onChangePainel(option) {
    const rotina = JSON.parse(JSON.stringify(data));
    rotina.paineis.push({ ...option, id: option.value });
    setData(rotina)
    // await save('/rotina/rotinaPainel', { rotina_id: id, painel_id: option.value });
  }

  async function onChangeResponsavel(option) {
    const rotina = JSON.parse(JSON.stringify(data));
    rotina.responsaveis.push({ ...option, rotina_id: id, responsavel_id: option.value });
    setData(rotina)
  }

  async function onChangeTipoResponsavel(row, option) {
    const rotina = JSON.parse(JSON.stringify(data));
    const responsaveis = rotina.responsaveis;
    const responsavel = responsaveis.find(r => r.id === row.id);
    responsavel.tipo_id = option.value;

    setData(rotina)
  }

  async function salvar() {
    const response = await save('/rotina', {
      ...data,
      paineis: data.paineis.map(d => d.id),
      responsaveis: data.responsaveis.map(d => ({ responsavel_id: d.id, tipo_id: d.tipo_id })),
    });
    if (response) {
      props.message('Salvo com sucesso');
      atualizar(response.id);
    }
  }

  async function onDelete(id) {
    if (confirm('Excluir?')) {
      const response = await destroy(`/rotina/rotina/${id}`);
      if (response) {
        props.message('Excluído com sucesso');
        voltar();
      }
    }
  }

  async function onCDeletePainel(row) {
    const rotina = JSON.parse(JSON.stringify(data));
    rotina.paineis = rotina.paineis.filter(p => p.id !== row.id);
    setData(rotina)
    // await save('/rotina/rotinaPainel', { rotina_id: id, painel_id: option.value });
  }

  async function onCDeleteResponsavel(row) {
    const rotina = JSON.parse(JSON.stringify(data));
    rotina.responsaveis = rotina.responsaveis.filter(p => p.id !== row.id);
    setData(rotina)
  }

  function atualizar(id) {
    props.history.push(`/rotina/${id}`);
  }

  function voltar() {
    props.history.push(`/rotinas`);
  }

  return (
    <div>
      <Form
        action={salvar}
        actions={[
          {
            label: 'Novo',
            onClick: () => atualizar(0),
            hide: !id,
          },
          {
            type: 'submit',
            label: 'Salvar',
            hide: !formEditavel,
          },
          {
            label: 'Editar',
            hide: formEditavel,
            onClick: () => setFormEditavel(true),
            hide: !id,
          },
          {
            label: 'Excluir',
            onClick: () => onDelete(id),
            hide: !id || !formEditavel,
          },
          {
            label: 'Voltar',
            onClick: voltar,
          },
        ]}>
        <Grid container spacing={2} alignItems='flex-end'>

          <Grid item xs={8}>
            <TextInput
              id="nome"
              label="Título"
              value={data.nome}
              onChange={onChange}
              required
              maxLength={100}
              disabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={2}>
            <DateInput
              id="dataCriacao"
              label="Data Criação"
              value={data.dataCriacao}
              onChange={onChange}
              disabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={2}>
            <SelectStatusRotina
              value={data.status_id}
              onChange={onChange}
              isDisabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={2}>
            <SelectTipoRotina
              value={data.tipo_id}
              onChange={onChange}
              required
              isDisabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={3}>
            <SelectFerramentaRotina
              value={data.ferramentas}
              onChange={onChange}
              required
              isMulti
              isDisabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={2}>
            <SelectApresentacaoRotina
              value={data.apresentacao_id}
              onChange={onChange}
              required
              isDisabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={5}>
            <SelectTagRotina
              value={data.tags}
              onChange={onChange}
              required
              isMulti
              isDisabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={2}>
            <SelectPeriodicidadeRotina
              value={data.periodicidade_id}
              onChange={onChange}
              required
              isDisabled={!formEditavel}
            />
          </Grid>

          {data.periodicidade_id == ID_PERIODICIDADE_SEMANAL &&
            <Grid item xs={2}>
              <SelectDiaSemana
                value={data.dia_semana}
                onChange={onChange}
                isDisabled={!formEditavel}
              />
            </Grid>}

          {[ID_PERIODICIDADE_TRIMESTRAL, ID_PERIODICIDADE_SEMESTRAL, ID_PERIODICIDADE_ANUAL].includes(Number(data.periodicidade_id)) &&
            <Grid item xs={3}>
              <SelectMes
                id="periodos"
                label="Meses da Rotina"
                value={data.periodos.map(v => v.mes)}
                onChange={onChangePeriodos}
                isMulti
                error={getError}
                isDisabled={!formEditavel}
              />
            </Grid>}

          {[ID_PERIODICIDADE_MENSAL, ID_PERIODICIDADE_TRIMESTRAL, ID_PERIODICIDADE_SEMESTRAL, ID_PERIODICIDADE_ANUAL].includes(Number(data.periodicidade_id)) &&
            <Grid item xs={1}>
              <NumberInput
                id="dia_mes_inicio"
                label="Dia Início"
                value={data.dia_mes_inicio}
                onChange={onChange}
                precision={0}
                maxLength={2}
                required
                disabled={!formEditavel}
              />
            </Grid>}

          {[ID_PERIODICIDADE_MENSAL, ID_PERIODICIDADE_TRIMESTRAL, ID_PERIODICIDADE_SEMESTRAL, ID_PERIODICIDADE_ANUAL].includes(Number(data.periodicidade_id)) &&
            <Grid item xs={1}>
              <NumberInput
                id="dia_mes_fim"
                label="Dia Fim"
                value={data.dia_mes_fim}
                onChange={onChange}
                precision={0}
                maxLength={2}
                required
                disabled={!formEditavel}
              />
            </Grid>}

          <Grid item xs={2}>
            <SelectTipoPeriodicidadeRotina
              value={data.tipoPeriodicidade_id}
              onChange={onChange}
              isDisabled={!formEditavel}
            />
          </Grid>



          <Grid item xs={12}>
            <TextInput
              id="linkPop"
              label="Link do POP"
              value={data.linkPop}
              onChange={onChange}
              required
              disabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={12}>
            <TextArea
              id="descricao"
              label="Descrição"
              value={data.descricao}
              onChange={onChange}
              maxLength={100}
              rows={4}
              error={descricao.length < 100 ? 'Mínimo de 100 caracteres' : null}
              info={`${descricao.length} caracteres`}
              disabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={12}>
            <Switch
              id="automatica"
              label="Automática"
              checked={data.automatica}
              onChange={onChange}
              disabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={6}>
            <Section title="Responsáveis">
              <Grid container spacing={0} alignItems='flex-end' justifyContent='flex-end'>

                {formEditavel && <Grid item xs={1} >
                  <Button variant="outlined" onClick={() => setOpenFormResponsavel(true)} disabled={!formEditavel}>Incluir</Button>
                </Grid>}

                <Grid item xs={12}>
                  <BasicTable
                    rows={data.responsaveis}
                    columns={Object.keys(columns.responsavel).map(key => ({ ...columns.responsavel[key], dataKey: key }))}
                    striped />

                </Grid>
              </Grid>
            </Section>
          </Grid>

          <Grid item xs={12}>
            <Section title="Painéis">
              <Grid container spacing={1} alignItems='flex-end'>
                {formEditavel && <Grid item xs={11}>
                  <SelectPainel
                    label="Vincular Painel"
                    values={data.paineis.map(p => p.id)}
                    onChange={onChangePainel}
                    painel={painel}
                    isDisabled={!formEditavel}
                  />
                </Grid>}

                {formEditavel && <Grid item xs={1}>
                  <Button variant="outlined" onClick={() => setOpenFormPainel(true)} disabled={!formEditavel}>Novo</Button>
                </Grid>}


                <Grid item xs={12}>
                  <BasicTable
                    rows={data.paineis}
                    columns={Object.keys(columns.painel).map(key => ({ ...columns.painel[key], dataKey: key }))}
                    striped />

                </Grid>
              </Grid>
            </Section>
          </Grid>



          {/* <Grid item xs={3}>
            <TextInput
              id="dataHoraInclusao"
              label="Data Inclusão"
              value={moment(data.dataHoraInclusao).format('DD/MM/YYYY')}
              disabled
              hide={!id}
            />
          </Grid>

          <Grid item xs={9}>
            <TextInput
              id="usuarioInclusao"
              label="Usuário Inclusão"
              value={data.usuarioInclusao.nome}
              disabled
              hide={!id}
            />
          </Grid> */}

        </Grid>
      </Form>
      <Dialog open={openFormPainel} onClose={() => (false)}>
        <div style={{ width: 1200 }}>
          <FormPainel
            onClose={() => setOpenFormPainel(false)}
            getResponse={r => {
              setPainel(r);
              setOpenFormPainel(false);
            }} />
        </div>
      </Dialog>
      <Dialog open={openFormResponsavel} onClose={() => (false)}>
        <div style={{ width: 1200, height: 400 }}>
          <FormResponsavel
            onClose={() => setOpenFormResponsavel(false)}
            values={data.responsaveis.map(d => d.id)}
            onSubmit={r => {
              onChangeResponsavel(r);
              setOpenFormResponsavel(false);
            }} />
        </div>
      </Dialog>
    </div>
  );
}

Component.propTypes = {};
const mapStateToProps = ({ app: { usuario } }) => ({ usuario });
const mapDispatchToProps = ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Component);